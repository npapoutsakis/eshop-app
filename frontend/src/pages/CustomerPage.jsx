import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import photo from "../assets/product/headset.jpg";
import Cart from "../components/customerpage/Cart";
import Order from "../components/customerpage/Order";
import Product from "../components/customerpage/Product";
import products from "../components/customerpage/products";
import { Logout } from "../utils/login";
import "./CustomerPage.css";

function CustomerPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);

  async function handleLogout() {
    await Logout();
    navigate("/");
  }

  // go directly to /products
  useEffect(() => {
    if (loggedIn && Boolean(localStorage.getItem("isAuthenticated"))) {
      navigate("/customer/products");

      // Set false after logged in for the first time
      setLoggedIn(false);
    }
  }, [navigate, loggedIn]);

  return (
    <div className="customer-page">
      <header>
        <div className="welcome-message">
          <h2>
            Welcome {`${localStorage.getItem("username").toLocaleUpperCase()}`}!
          </h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="products">Products</Link>
            </li>
            <li>
              <Link to="cart">Cart</Link>
            </li>
            <li>
              <Link to="orders">Orders</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route
          path="products"
          element={products.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              image={photo}
              price={product.price}
              info={product.info}
            />
          ))}
        />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Order />} />
      </Routes>
    </div>
  );
}

export default CustomerPage;
