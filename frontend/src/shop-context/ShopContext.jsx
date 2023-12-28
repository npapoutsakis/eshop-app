import React, { createContext, useState } from "react";
import { PRODUCTS } from "../products.js";

export const shop_context = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContext = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  function getTotalCartAmount() {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  }

  function addToCart(itemId) {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }

  function removeFromCart(itemId) {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  }

  function updateCartItemCount(newAmount, itemId) {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  }

  function emptyCart() {
    setCartItems(getDefaultCart());
  }

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    emptyCart,
  };

  return (
    <shop_context.Provider value={contextValue}>
      {props.children}
    </shop_context.Provider>
  );
};

export default ShopContext;
