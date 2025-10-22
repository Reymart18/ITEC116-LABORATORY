import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        onLogin();
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <div style={backgroundStyle}>
      <div style={formContainer}>
        <h2 style={title}>Welcome Back</h2>
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
          Don’t have an account?{" "}
          <span style={linkText} onClick={onLogin}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

const backgroundStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
};

const formContainer = {
  width: "380px",
  padding: "30px",
  borderRadius: "16px",
  background: "#ffffffcc",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  textAlign: "center",
};

const title = {
  color: "#007BFF",
  fontSize: "24px",
  marginBottom: "20px",
  fontWeight: "700",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const submitBtn = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "linear-gradient(90deg, #007BFF, #00BFFF)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s ease",
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
