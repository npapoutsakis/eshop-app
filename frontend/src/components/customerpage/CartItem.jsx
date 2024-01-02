import React from "react";
import { useCart } from "../../shop-context/CartProvider.jsx";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, removeFromCart } = useCart();

  return (
    <div className="cartItem">
      <img src={productImage} alt="productImage" />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> Price: {price}€</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          {/* <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          /> */}
          <button onClick={() => addToCart(props)}> + </button>
        </div>
      </div>
    </div>
  );
};
