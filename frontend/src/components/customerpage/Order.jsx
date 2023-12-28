import React from "react";
import "./Order.css";

function Order({ order }) {
  return (
    <div className="cart">
      <div className="cartItem">
        <div className="description">
          <h2>Order #{order.id}</h2>

          <ul>
            {order.products.map((product) => (
              <li key={product.product_id}>
                {product.amount} x {product.title} - {product.price}€ each
              </li>
            ))}
          </ul>

          <p>Total Price: ${order.total_price}</p>
          <p>
            Status:{" "}
            <span className={`status-${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Order;
