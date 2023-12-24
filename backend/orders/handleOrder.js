import pool from "./databaseConnection.js";

// This function will update the status of each order
async function handleOrder(order) {
  try {
    const { id, status } = order;
    const db = await pool.connect();

    // just make the query and update the table orders
    await db.query("UPDATE orders SET status = $1 WHERE id = $2", [status, id]);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export default handleOrder;
