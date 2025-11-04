import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Login({ onLogin, setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Missing Fields", "Enter email and password", "warning");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        if (data.nickname) {
          localStorage.setItem("userNickname", data.nickname);
        }
        onLogin();
      } else {
        Swal.fire("Error", data.message || "Invalid login credentials", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire("Error", "Login failed. Check console for details.", "error");
    }
  };

  return (
    <div style={backgroundStyle}>
      <div style={formContainer}>
        <h2 style={title}>WELCOME</h2>
        <form onSubmit={handleLogin}>
          <input
            style={inputStyle}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button style={submitBtn} type="submit">
            Login
          </button>
        </form>
        <p style={footerText}>
          Don't have an account?{" "}
          <span style={linkText} onClick={() => setCurrentPage("register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

const backgroundStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f3f3f3ff",
};

const formContainer = {
  width: "360px",
  padding: "48px 36px",
  borderRadius: "12px",
  background: "#ffffff",
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  textAlign: "center",
};

const title = {
  color: "#000",
  fontSize: "20px",
  marginBottom: "28px",
  fontWeight: "800",
  letterSpacing: "0.6px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 18px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #cfcfcf",
  fontSize: "14px",
  boxSizing: "border-box",
  outline: "none",
};

const submitBtn = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "linear-gradient(180deg, #5b8fd6 0%, #4b79d8 100%)",
  color: "#fff",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  transition: "0.2s ease",
  boxSizing: "border-box",
};

const footerText = {
  marginTop: "15px",
  color: "#444",
  fontSize: "14px",
};

const linkText = {
  color: "#007BFF",
  cursor: "pointer",
  fontWeight: "600",
  textDecoration: "underline",
};
