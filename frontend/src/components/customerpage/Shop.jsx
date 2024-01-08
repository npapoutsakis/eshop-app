import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/customer";
import Product from "./Product";
import "./Shop.css";

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => (
            <Product key={product.id} data={product} />
          ))}
      </div>
    </div>
  );
}

export default Shop;
