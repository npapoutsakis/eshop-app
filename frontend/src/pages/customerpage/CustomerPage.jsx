import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getProducts } from "../../api/customer";
import Cart from "../../components/customerpage/Cart";
import Order from "../../components/customerpage/Order";
import Product from "../../components/customerpage/Product";

import { Logout } from "../../utils/login";
import "./CustomerPage.css";

function CustomerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  // go directly to /products
  useEffect(() => {
    if (loggedIn && Boolean(localStorage.getItem("isAuthenticated"))) {
      // get all products from database
      getProducts().then((data) => {
        if (data) {
          setProducts(data);
        }
      });

      navigate("/customer/products");

      // Set false after logged in for the first time
      setLoggedIn(false);
    }
  }, [navigate, loggedIn]);

  // After Logout() navigte to '/' page
  async function handleLogout() {
    await Logout();
    navigate("/");
  }

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      (product.title ?? "")
        .toLowerCase()
        .includes((searchTerm ?? "").toLowerCase()) ||
      product.price.toString().includes(searchTerm)
  );

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

      {/* {location.pathname.includes("/products") && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search a product"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      )} */}

      <Routes>
        <Route
          path="products"
          element={filteredProducts.map((product) => (
            <Product
              key={product.id}
              name={product.title}
              image={product.img}
              price={product.price}
            />
          ))}
        />
        <Route path="cart" element={<Cart />} />
        <Route
          path="orders"
          element={<Order username={localStorage.getItem("username")} />}
        />
      </Routes>
    </div>
  );
}

export default CustomerPage;
