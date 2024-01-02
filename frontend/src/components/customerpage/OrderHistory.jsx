import React, { useEffect, useState } from "react";
import Order from "./Order.jsx";
import "./OrderHistory.css";

import { getOrders } from "../../api/customer.js";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders(username) {
    try {
      const fetchedOrders = await getOrders(username);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    fetchOrders(localStorage.getItem("username"));
  }, []);

  return (
    <div className="order-history">
      <div style={{ marginTop: "100px" }}>
        <h1>Your Orders</h1>
      </div>
      {orders
        .sort((a, b) => a.id - b.id)
        .map((order) => (
          <Order key={order.id} order={order} />
        ))}
    </div>
  );
}

export default OrderHistory;
