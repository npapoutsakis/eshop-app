import React, { useState } from "react";
import { PRODUCTS } from "../../products";
import Product from "./Product";
import "./Shop.css";

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="shop">
      <div className="shopTitle">
        <h2>Welcome to my E-Shop!</h2>
      </div>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Should grab products from database */}
      <div className="products">
        {PRODUCTS.filter((product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
