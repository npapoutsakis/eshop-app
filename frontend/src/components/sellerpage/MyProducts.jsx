import React, { useEffect, useState } from "react";
import { getProductByUsername } from "../../api/customer";
import SellerProduct from "./SellerProduct";

function MyProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [myproducts, setMyProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const fetchedProducts = await getProductByUsername(
          localStorage.getItem("username")
        );
        setMyProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching sellers products:", error);
      }
    };

    fetchMyProducts();
  }, []);

  return (
    <div className="shop">
      <div className="shopTitle">
        <h2>{localStorage.getItem("username")}'s products!</h2>
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
        {myproducts
          .filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => (
            <SellerProduct key={product.id} data={product} />
          ))}
      </div>
    </div>
  );
}

export default MyProducts;
