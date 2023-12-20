import React from "react";
import "./Product.css";

function Product({ image, name, price, info }) {
  return (
    <div className="product">
      <div className="product-wrapper">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{info}</p>
        <p>Price: {price}€</p>
        {/* Should add Button to add or remove for the cart */}
      </div>
    </div>
  );
}

export default Product;
