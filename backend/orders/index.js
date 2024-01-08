import cors from "cors";
import express from "express";
import pool from "./databaseConnection.js";
import { sendOrders } from "./kafka.js";

const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// check for token validation
const checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ "Access Denied": "Unauthorized" });
  }
  next();
};

// Server running
app.get("/", (request, response) => {
  response.send("Ok!");
});

// GET ORDERS - CUSTOMER
app.get("/api/orders/:username", checkToken, async (request, response) => {
  const username = request.params.username;
  try {
    const db = await pool;

    const result = await db.query(
      "SELECT * FROM orders WHERE user_username = $1",
      [username]
    );

    response.send(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// POST - CUSTOMER
app.post("/api/orders", checkToken, async (request, response) => {
  const { products, total_price, user_username } = request.body;
  try {
    const db = await pool;

    const result = await db.query(
      "INSERT INTO orders (products, total_price, status, user_username) VALUES ($1, $2, $3, $4) RETURNING *",
      [JSON.stringify(products), total_price, "Pending", user_username]
    );

    // have to send message to product-service
    const orderMessage = {
      id: result.rows[0].id,
      products: products,
    };

    console.log(orderMessage);

    // sending the order for checking
    await sendOrders(orderMessage);

    response.send(result.rows[0]);
  } catch (error) {
    console.error("Error processing order:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// LISTEN
app.listen(port, () => {
  console.log(`Orders Server is running on http://localhost:${port}`);
});
