import React from "react";
// import { useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem";

import { useCart } from "../../shop-context/CartProvider.jsx";
import "./Cart.css";
function Cart() {
  const { cart } = useCart();

  // const navigate = useNavigate();

  return (
    <div className="cart">
      <div style={{ marginTop: "100px" }}>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {cart.map((product) => {
          if (cart[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />;
          } else return <React.Fragment key={product.id} />;
        })}
      </div>
      {/* 
      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: {totalAmount} € </p>
          <button onClick={() => navigate("/customer/products")}>
            {" "}
            Continue Shopping{" "}
          </button>
          <button
            onClick={() => {
              clearCart();
              alert("Order Send!");
              navigate("/customer/products");
            }}
          >
            Order Now!
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )} */}
    </div>
  );
}

export default Cart;
