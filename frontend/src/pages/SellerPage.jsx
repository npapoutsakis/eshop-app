import React from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "../utils/login";

function SellerPage() {
  const navigate = useNavigate();

  async function handleLogout() {
    await Logout();
    navigate("/");
  }

  return (
    <div>
      <h1>Welcome to Seller Page</h1>
      <button onClick={handleLogout}> LOGOUT REEE!</button>
    </div>
  );
}

export default SellerPage;
