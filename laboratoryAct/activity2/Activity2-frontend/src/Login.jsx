import React, { useState } from "react";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import { loginUser } from "./api";
import "./Login.css";

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(email, password);

      if (res.token) {
        // ✅ Success Alert

        onLogin(res.token);
      } else {
        // ❌ Error Alert
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res.message || "Invalid email or password.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <h2 className="login-title">Login</h2>

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
            Login
          </button>
        </form>

        <p className="switch-text">
          Don't have an account?{" "}
          <span className="switch-link" onClick={onSwitch}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
