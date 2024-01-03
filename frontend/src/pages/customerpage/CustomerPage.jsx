import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// Components
import Cart from "../../components/customerpage/Cart";
import OrderHistory from "../../components/customerpage/OrderHistory.jsx";
import Shop from "../../components/customerpage/Shop.jsx";
import Navbar from "../../components/default/Navbar.jsx";
import { CartProvider } from "../../shop-context/CartProvider.jsx";
import { Logout } from "../../utils/login";

function CustomerPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (loggedIn && Boolean(localStorage.getItem("isAuthenticated"))) {
      navigate("/customer/products");

      // Set false after logged in for the first time
      setLoggedIn(false);
    }
  }, [navigate, loggedIn]);

  async function handleLogout() {
    await Logout();
    navigate("/");
  }

  return (
    <div>
      <CartProvider>
        <Navbar
          logout={handleLogout}
          user_role={localStorage.getItem("role")}
        />
        <Routes>
          <Route path="products" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<OrderHistory />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default CustomerPage;
