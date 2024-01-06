import cors from "cors";
import express, { response } from "express";
import pool from "./databaseConnection.js";
import { sendOrders } from "./kafka.js";

import session from "express-session";
import Keycloak from "keycloak-connect";

const app = express();
const port = 5500;

const keycloak = new Keycloak("./keycloak.json");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "NeOBItxA6VrnhaDsHD8226ObY7DD3odl",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(keycloak.middleware());

// Server running
app.get("/", (request, response) => {
  response.send("Ok!");
});

// GET ORDERS - CUSTOMER
app.get(
  "/api/orders/:username",
  keycloak.protect("realm:Customer"),
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
app.post(
  "/api/orders",
  keycloak.protect("realm:Customer"),
  async (request, response) => {
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
  }
);

// LISTEN
app.listen(port, () => {
  console.log(`Orders Server is running on http://localhost:${port}`);
});
