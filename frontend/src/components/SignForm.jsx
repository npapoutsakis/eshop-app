import React, { useState } from "react";
import { Login, Logout, Register } from "../utils/login.js";
import "./SignForm.css";

// i have to fetch data from keycloack api to see if the user is already registered
function SignForm() {
  const [isRegistered, setStatus] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  function handleClick() {
    setStatus(!isRegistered);
    setUsername("");
    setEmail("");
    setPassword("");
    setSelectedRole("");
  }

  function handleRoleChange(event) {
    setSelectedRole(event.target.value);
  }

  async function triggerAction(event) {
    if (!isRegistered && selectedRole === "") {
      event.preventDefault();
      alert("Please select a role!");
    } 
    else if (!isRegistered) {
      try 
      {
        let group = "Sellers";
        
        if (selectedRole === "Customer") group = "Customers";
        
        await Register(event, username, email, password, group);
      } 
      catch (error) {
        console.log(error);
      }
    } 
    else {
      try 
      {
        await Login(event, username, password);
      } 
      catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-heading">
        {isRegistered ? "Login" : "Create Account"}
      </h2>
      <form className="auth-form">
        <input
          id="auth-input-username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {!isRegistered && (
          <input
            id="auth-input-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          id="auth-input-pass"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isRegistered || (
          <div className="role-selection">
            <label className="role-label">Select Role:</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  value="Seller"
                  checked={selectedRole === "Seller"}
                  onChange={handleRoleChange}
                  required
                />
                Seller
              </label>
              <label>
                <input
                  type="radio"
                  value="Customer"
                  checked={selectedRole === "Customer"}
                  onChange={handleRoleChange}
                  required
                />
                Customer
              </label>
            </div>
          </div>
        )}

        <button onClick={triggerAction} className="auth-button">
          {isRegistered ? "Login" : "Register"}
        </button>
      </form>

      <p className="toggle-mode">
        {isRegistered ? "Not registered? " : "Already have an account? "}
        <span onClick={handleClick} className="toggle-link">
          {isRegistered ? "Register here" : "Login here"}
        </span>
      </p>

        <button onClick={Logout}> LOGOUT REEE!</button>

    </div>
  );
}

export default SignForm;
