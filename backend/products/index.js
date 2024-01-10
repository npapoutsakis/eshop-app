import cors from "cors";
import express from "express";
import pool from "./databaseConnection.js";
import "./kafka.js";
import { decodeJwt, isTokenExpired } from "./utils.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
const checkToken = (role) => async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ "Access Denied": "Unauthorized" });
  }

  // get exp date and see if the token is invalid
  const decodeToken = await decodeJwt(token.split(" ")[1]);

  if (isTokenExpired(decodeToken.exp)) {
    return res.status(401).json({
      "Access Denied":
        "Token expired, you will be redirected back to login page!",
    });
  }

  // check role
  const token_role =
    decodeToken.realm_access.roles[0] === "Customer"
      ? decodeToken.realm_access.roles[0]
      : decodeToken.realm_access.roles[1];

  if (token_role !== role) {
    return res.status(401).json({ "Access Denied": "Not allowed!" });
  }

  next();
};

// Server running
app.get("/", (request, response) => {
  response.send("Ok!");
});

// GET - CUSTOMER
// Get all products from database
app.get("/api/products", checkToken("Customer"), async (request, response) => {
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
app.get(
  "/api/products/:param",
  checkToken("Customer"),
  async (request, response) => {
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
  }
);

// POST - SELLER
// Add a new product into database
app.post("/api/products", checkToken("Seller"), async (request, response) => {
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
app.put(
  "/api/products/:id",
  checkToken("Seller"),
  async (request, response) => {
    // dont change name of seller, doesnt make sense
    try {
      const id = request.params.id;
      const { price, quantity } = request.body;

      const db = await pool;

      const updateQuery = `
      UPDATE products
      SET price = $1, quantity = $2
      WHERE id = $3
    `;

      const result = await db.query(updateQuery, [price, quantity, id]);

      // Check if the update was successful
      if (result.rowCount > 0) {
        response.json({ message: "Product updated successfully" });
      } else {
        response.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// DELETE - SELLER
// Delete a product from database
app.delete(
  "/api/products/:id",
  checkToken("Seller"),
  async (request, response) => {
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
  }
);

// LISTEN
app.listen(port, () => {
  console.log(`Products Server is running on http://localhost:${port}`);
});
