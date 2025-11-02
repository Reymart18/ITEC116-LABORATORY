import React, { useState } from "react";
import Swal from "sweetalert2";
import { registerUser } from "./api";
import "./Login.css";

function Register({ onRegister, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;

    if (!minLength.test(password)) {
      Swal.fire("Weak Password", "Password must be at least 8 characters long", "warning");
      return false;
    }
    if (!upper.test(password)) {
      Swal.fire("Weak Password", "Password must contain at least one uppercase letter", "warning");
      return false;
    }
    if (!lower.test(password)) {
      Swal.fire("Weak Password", "Password must contain at least one lowercase letter", "warning");
      return false;
    }
    if (!number.test(password)) {
      Swal.fire("Weak Password", "Password must contain at least one number", "warning");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) return;

    try {
      const res = await registerUser(email, password);

      // ✅ FIX: Check for successful registration properly
      if (res.id || res.message?.toLowerCase().includes("success")) {
        Swal.fire("Success", res.message || "Registration successful!", "success");
        onRegister(res.id);
      } else {
        Swal.fire("Error", res.message || "Registration failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error. Please try again later.", "error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <h2 className="login-title">Register</h2>

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
    </div>
  );
}

export default Register;
