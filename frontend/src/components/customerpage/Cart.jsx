import React from "react";
import { useNavigate } from "react-router-dom";
import { makeOrder } from "../../api/customer.js";
import { useCart } from "../../shop-context/CartProvider.jsx";
import "./Cart.css";
import { CartItem } from "./CartItem";

function Cart() {
  const { cart, clearCart, calculateTotalCost } = useCart();
  const navigate = useNavigate();
  const totalAmount = calculateTotalCost();

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

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: {totalAmount} € </p>
          <button onClick={() => navigate("/customer/products")}>
            {" "}
            Continue Shopping{" "}
          </button>
          <button
            onClick={async () => {
              // Empty cart
              clearCart();

              // send the order to order-service
              await makeOrder(cart, totalAmount).then(
                console.log("Order Send!")
              );

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
