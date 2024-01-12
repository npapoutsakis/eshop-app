import cors from "cors";
import express from "express";
import pool from "./databaseConnection.js";
import { sendOrders } from "./kafka.js";
import { decodeJwt, isTokenExpired } from "./utils.js";

const app = express();
const port = 5500;

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
      : decodeToken.realm_access.roles[2];

  if (token_role !== role) {
    return res.status(401).json({ "Access Denied": "Not allowed!" });
  }

  next();
};

// Server running
app.get("/", (request, response) => {
  response.send("Ok!");
});

// GET ORDERS - CUSTOMER
app.get(
  "/api/orders/:username",
  checkToken("Customer"),
  async (request, response) => {
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
  }
);

// POST - CUSTOMER
app.post("/api/orders", checkToken("Customer"), async (request, response) => {
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
