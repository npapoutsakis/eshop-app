import { ShoppingCart, SignOut } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ logout }) {
  return (
    <div className="navbar">
      <div className="welcome-msg">
        <h2>Welcome {localStorage.getItem("username")}!</h2>
      </div>
      <div className="links">
        <Link to="products"> Products </Link>
        <Link to="orders"> Orders </Link>
        <Link to="cart">
          <ShoppingCart size={32} />
        </Link>
        <Link>
          <SignOut size={32} onClick={logout} weight="bold" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
