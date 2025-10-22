import React, { useState } from "react";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        onRegister();
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Check console for details.");
    }
  };

  return (
    <div style={backgroundStyle}>
      <div style={formContainer}>
        <h2 style={title}>Create Your Account</h2>
        <form onSubmit={handleRegister}>
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
            Register
          </button>
        </form>
        <p style={footerText}>
          Already have an account?{" "}
          <span style={linkText} onClick={onRegister}>
            Login here
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
  background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
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
  color: "#ff6347",
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
  background: "linear-gradient(90deg, #ff6347, #ff7e5f)",
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
  color: "#ff6347",
  cursor: "pointer",
  fontWeight: "600",
  textDecoration: "underline",
};
