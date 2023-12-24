import pg from "pg";
const { Pool } = pg;

async function connect() {
  try {
    const pool = new Pool({
      host: "localhost",
      port: "3308",
      user: "admin",
      password: "admin",
      database: "orders_db",
    });

    console.log("Connected to Orders database");

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            products JSON,
            total_price DECIMAL(10, 2),
            status VARCHAR(255),
            user_username VARCHAR(255)
        )
        `;

    const client = await pool.connect();
    try {
      await client.query(createTableQuery);
    } finally {
      client.release();
    }

    return pool;
  } catch (error) {
    console.error("Error connecting to Orders Database:", error);
    throw new Error(error);
  }
}

const pool = connect();

export default pool;
