import pool from "./databaseConnection.js";

// This function will update products on database when a new order is made
async function handleProducts(order) {
  try {
    const db = await pool;

    // Check if products amount is > 0
    for await (const obj of order.products) {
      const data = await db.query("SELECT * FROM products WHERE id = $1", [
        obj.product_id,
      ]);

      const quantity = data.rows[0].quantity;
      if (quantity < obj.amount) {
        return false;
      }
    }

    // If all amounts are between the limits, continue with the update of products database
    for await (const obj of order.products) {
      const data = await db.query("SELECT * FROM products WHERE id = $1", [
        obj.product_id,
      ]);

      const newQuantity = data.rows[0].quantity - obj.amount;
      await db.query("UPDATE products SET quantity = $1 WHERE id = $2", [
        newQuantity,
        obj.product_id,
      ]);
    }

    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export default handleProducts;
