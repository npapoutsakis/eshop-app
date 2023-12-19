import React from "react";
import "./Product.css";

function Product({ image, name, price, info }) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{info}</p>
      <p>Price: {price}€</p>
    </div>
  );
}

export default Product;
