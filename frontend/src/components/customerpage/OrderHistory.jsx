import React from "react";
import orders from "../../orders.js";
import Order from "./Order.jsx";
import "./OrderHistory.css";

function OrderHistory() {
  return (
    <div className="order-history">
      <div style={{ marginTop: "100px" }}>
        <h1>Your Orders</h1>
      </div>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
}

export default OrderHistory;
