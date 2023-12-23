import pg from "pg";
const { Pool } = pg;

// Connect to the database
async function connect() {
  try {
    const pool = new Pool({
      host: "localhost",
      port: 3310,
      user: "admin",
      password: "admin",
      database: "products_db",
    });

    console.log("Connected to PostgreSQL database");

    // Create a table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          img VARCHAR(255),
          price DECIMAL(10, 2),
          quantity INT,
          user_product VARCHAR(255)
      )
    `;

    const serialSet = `ALTER SEQUENCE products_id_seq RESTART WITH 1`;
    const resetSequence = `SELECT pg_get_serial_sequence('products', 'id')`;

    const orderIDTrigger = `CREATE OR REPLACE FUNCTION delete_and_update_sequence()
    RETURNS TRIGGER AS $$
    DECLARE
        current_max_id INT;
    BEGIN
        -- Get the current maximum id
        SELECT COALESCE(MAX(id), 0) INTO current_max_id FROM products;
    
        -- Update rows with id greater than the deleted id
        IF current_max_id > OLD.id THEN
            UPDATE products SET id = id - 1 WHERE id > OLD.id AND id <> OLD.id;
        END IF;
    
        -- Reset the sequence only if there are remaining products
        IF current_max_id > 1 THEN
            EXECUTE 'SELECT setval(''products_id_seq'', ' || current_max_id || ')';
        ELSE
            -- If no remaining products, reset the sequence to 1
            EXECUTE 'SELECT setval(''products_id_seq'', 1)';
        END IF;
    
        RETURN OLD;
    END;
    $$ LANGUAGE plpgsql;

    
    CREATE OR REPLACE TRIGGER update_products_id_sequence
    AFTER DELETE ON products
    FOR EACH ROW
    EXECUTE FUNCTION delete_and_update_sequence();
    `;

    const client = await pool.connect();
    try {
      await client.query(createTableQuery);
      await client.query(serialSet);
      await client.query(resetSequence);
      await client.query(orderIDTrigger);
    } finally {
      client.release();
    }

    return pool;
  } catch (e) {
    console.error("Error connecting to PostgreSQL:", e);
    throw new Error(e);
  }
}

const pool = connect();

export default pool;
