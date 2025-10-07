// Register.js
import React, { useState } from "react";
import { registerUser } from "./api";
import "./Activity2.css"; // use same CSS file

function Register({ onRegister, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(email, password);
      if (res.id) {
        onRegister(res.id);
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="login-wrapper">
      <h2 className="login-title">Register</h2>
      {error && <div className="error-msg">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">
          Register
        </button>
      </form>
      <p className="switch-text">
        Already have an account?{" "}
        <span className="switch-link" onClick={onSwitch}>
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;
