import React, { useState } from "react";
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

  function isUnchecked(e) {
    if (!isRegistered && selectedRole === "") {
      e.preventDefault();
      alert("Please select a role!");
    }
  }

  function handleRoleChange(event) {
    setSelectedRole(event.target.value);
  }

  return (
    <div className="auth-container">
      <h2 className="auth-heading">
        {isRegistered ? "Login" : "Create Account"}
      </h2>
      <form className="auth-form">
        <input
          className="auth-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {!isRegistered && (
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
        {isRegistered || (
          <div className="role-selection">
            <label className="role-label">Select Role:</label>
            <div className="radio-options">
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
          </div>
        )}

        <button onClick={isUnchecked} className="auth-button">
          {isRegistered ? "Login" : "Register"}
        </button>
      </form>

      <p className="toggle-mode">
        {isRegistered ? "Not registered? " : "Already have an account? "}
        <span onClick={handleClick} className="toggle-link">
          {isRegistered ? "Register here" : "Login here"}
        </span>
      </p>
    </div>
  );
}

export default SignForm;
