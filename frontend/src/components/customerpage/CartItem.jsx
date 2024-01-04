import { MinusCircle, PlusCircle } from "phosphor-react";
import React from "react";
import { useCart } from "../../shop-context/CartProvider.jsx";

import "./Cart.css";
export const CartItem = (props) => {
  const { id, title, price, img } = props.data;
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  const productInCart = cart.find((item) => item.id === id);
  const cartItemCount = productInCart ? productInCart.quantity : 0;

  return (
    <div className="cartItem">
      <img src={img} alt="productImage" />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        <p> Price: {price}€</p>
        <div className="countHandler">
          <MinusCircle size={24} onClick={() => removeFromCart(id)} />
          <input
            value={cartItemCount}
            onChange={(e) => updateQuantity(Number(e.target.value), id)}
          />
          <PlusCircle size={24} onClick={() => addToCart(props.data)} />
        </div>
      </div>
    </div>
  );
};
