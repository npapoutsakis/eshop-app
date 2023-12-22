import React, { useState } from "react";
import "./Product.css";

function Product({ image, name, price, info }) {
  const [clickCount, setClickCount] = useState(0);

  function handleAddToCart() {
    setClickCount(clickCount + 1);
  }

  return (
    <div className="product">
      <div className="product-wrapper">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{info}</p>
        <p>Price: {price}€</p>
        <button onClick={handleAddToCart}>Add to Cart ({clickCount})</button>
      </div>
    </div>
  );
}

export default Product;
