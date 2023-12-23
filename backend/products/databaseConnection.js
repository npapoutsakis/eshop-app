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

    const client = await pool.connect();
    try {
      await client.query(createTableQuery);
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
