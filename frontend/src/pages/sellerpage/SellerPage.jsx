import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/default/Navbar.jsx";
import { Logout } from "../../utils/login";

function SellerPage() {
  const navigate = useNavigate();

  async function handleLogout() {
    await Logout();
    navigate("/");
  }

  return (
    <div>
      <Navbar logout={handleLogout} user_role={localStorage.getItem("role")} />
      <h1>Welcome to Seller Page</h1>
    </div>
  );
}

export default SellerPage;
