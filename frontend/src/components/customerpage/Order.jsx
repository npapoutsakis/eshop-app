import { ArrowRight, Package } from "phosphor-react";
import React from "react";
import "./Order.css";

function Order({ order }) {
  return (
    <div className="order">
      <div className="orderItem">
        <div className="description">
          <div className="header">
            <Package size={32} weight="bold" />
            <h2>Order No.{order.id}</h2>
          </div>
          <ul>
            {order.products.map((product) => (
              <li key={product.product_id}>
                --
                <ArrowRight size={11.5} weight="bold" /> {product.amount} x{" "}
                {product.title}
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
