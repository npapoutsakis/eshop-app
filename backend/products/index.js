import cors from "cors";
import express from "express";
import pool from "./databaseConnection.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server running
app.get("/", (request, response) => {
  response.send("Ok!");
});

// GET - CUSTOMER
// Get all products from database
app.get("/api/products", async (request, response) => {
  try {
    const db = await pool;

    const client = await db.connect();

    try {
      // Execute the query
      const results = await client.query("SELECT * FROM products ORDER BY id");

      // Send the results
      response.json(results.rows);
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// GET - CUSTOMER
// Get product by id, name of product and seller
app.get("/api/products/:param", async (request, response) => {
  try {
    const parameter = request.params.param;

    const db = await pool;

    // Check if the parameter is a number
    if (!isNaN(parameter)) {
      const result = await db.query("SELECT * FROM products WHERE id = $1", [
        parameter,
      ]);

      response.send(result.rows);
    } else {
      // Check if the parameter is a string (title or username)

      const result = await db.query(
        "SELECT * FROM products WHERE title = $1 OR user_product = $1",
        [parameter]
      );

      response.send(result.rows);
    }
  } catch (error) {
    console.error("Error fetching product by username:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// POST - SELLER
// Add a new product into database
app.post("/api/products", async (request, response) => {
  const product = request.body;

  try {
    const db = await pool;

    const result = await db.query(
      "INSERT INTO products (title, img, price, quantity, user_product) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        product.title,
        product.img,
        product.price,
        product.quantity,
        product.user_product,
      ]
    );

    response.send(result.rows[0]);
  } catch (error) {
    console.error("Error inserting product:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE - SELLER
// Update product on database
app.put("/api/products/:id", async (request, response) => {
  // dont change name of seller, doesnt make sense
  try {
    const id = request.params.id;
    const { title, img, price, quantity } = request.body;

    const db = await pool;

    const updateQuery = `
      UPDATE products
      SET title = $1, img = $2, price = $3, quantity = $4
      WHERE id = $5
    `;

    const result = await db.query(updateQuery, [
      title,
      img,
      price,
      quantity,
      id,
    ]);

    // Check if the update was successful
    if (result.rowCount > 0) {
      response.json({ message: "Product updated successfully" });
    } else {
      response.status(404).json({ error: "Product not found" });
    }

    // client.release();
  } catch (error) {
    console.error("Error updating product:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE - SELLER
// Delete a product from database
app.delete("/api/products/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const db = await pool;

    // Execute the DELETE query
    const result = await db.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    // Check if a product was deleted
    if (result.rows.length > 0) {
      response.send({
        message: "Product deleted successfully",
        deletedProduct: result.rows[0],
      });
    } else {
      response.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// LISTEN
app.listen(port, () => {
  console.log(`Products Server is running on http://localhost:${port}`);
});
