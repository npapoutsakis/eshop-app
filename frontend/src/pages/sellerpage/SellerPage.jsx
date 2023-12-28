import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Logout } from "../../utils/login";

function SellerPage() {
  const navigate = useNavigate();

  async function handleLogout() {
    await Logout();
    navigate("/");
  }

  return (
    <div>
      <Navbar logout={handleLogout} />
      <h1>Welcome to Seller Page</h1>
    </div>
  );
}

export default SellerPage;
