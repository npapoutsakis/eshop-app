import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../../components/default/Navbar.jsx";

import MyProducts from "../../components/sellerpage/MyProducts.jsx";
import { Logout } from "../../utils/login";

function SellerPage() {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));

    if (loggedIn && isAuthenticated) {
      navigate("/seller/myproducts");

      // Set false after logged in for the first time
      setLoggedIn(false);
    }
  }, [loggedIn, navigate]);

  async function handleLogout() {
    await Logout();
    navigate("/");
  }

  return (
    <div>
      <Navbar logout={handleLogout} user_role={localStorage.getItem("role")} />
      <Routes>
        <Route path="myproducts" element={<MyProducts />}></Route>
      </Routes>
    </div>
  );
}

export default SellerPage;
