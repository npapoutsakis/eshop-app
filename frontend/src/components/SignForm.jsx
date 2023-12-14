import React, { useState } from "react";
import "./SignForm.css";

// i have to fetch data from keycloack api to see if the user is already registered
function SignForm() {
  const [status, setStatus] = useState(true);
  const [selectedRole, setSelectedRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleClick() {
    setStatus(!status);
    setUsername("");
    setEmail("");
    setPassword("");
    setSelectedRole("");
  }

  function handleRoleChange(event) {
    setSelectedRole(event.target.value);
  }

  return (
    <div className="auth-container">
      <h2 className="auth-heading">{status ? "Login" : "Create Account"}</h2>
      <form className="auth-form">
        <input
          className="auth-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {!status && (
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {status || (
          <div className="role-selection">
            <label>
              <input
                type="radio"
                value="seller"
                checked={selectedRole === "seller"}
                onChange={handleRoleChange}
              />
              Seller
            </label>
            <label>
              <input
                type="radio"
                value="customer"
                checked={selectedRole === "customer"}
                onChange={handleRoleChange}
              />
              Customer
            </label>
          </div>
        )}

        <button className="auth-button">{status ? "Login" : "Register"}</button>
      </form>

      <p className="toggle-mode">
        {status ? "Not registered? " : "Already have an account? "}
        <span onClick={handleClick} className="toggle-link">
          {status ? "Register here" : "Login here"}
        </span>
      </p>
    </div>
  );
}

export default SignForm;
