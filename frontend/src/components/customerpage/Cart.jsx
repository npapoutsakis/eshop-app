import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../products";
import { shop_context } from "../../shop-context/ShopContext";
import { CartItem } from "./CartItem";

import "./Cart.css";
function Cart() {
  const { cartItems, getTotalCartAmount, emptyCart } = useContext(shop_context);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div style={{ marginTop: "100px" }}>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />;
          } else return <></>;
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: {totalAmount} € </p>
          <button onClick={() => navigate("/customer/products")}>
            {" "}
            Continue Shopping{" "}
          </button>
          <button
            onClick={() => {
              emptyCart();
              alert("Order Send!");
              navigate("/customer/products");
            }}
          >
            Order Now!
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
}

export default Cart;
