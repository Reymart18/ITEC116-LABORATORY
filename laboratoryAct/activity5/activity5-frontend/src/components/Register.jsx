import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // 🔹 Check required fields
    if (!email || !password || !nickname) {
      Swal.fire("Missing Fields", "Enter all required fields", "warning");
      return;
    }

    // 🔹 Password validation (8 chars, 1 uppercase, 1 lowercase, 1 number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire(
        "Invalid Password",
        "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, and 1 number.",
        "error"
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nickname }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", data.message, "success");
        onRegister();
      } else {
        Swal.fire("Error", data.message || "Registration failed", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire("Error", "Registration failed. Check console for details.", "error");
    }
  };

  return (
    <div style={backgroundStyle}>
      <div style={formContainer}>
        <h2 style={title}>CREATE YOUR ACCOUNT</h2>
        <form onSubmit={handleRegister}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
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

// ✅ Styles
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
  color: "#ff6347",
  cursor: "pointer",
  fontWeight: "600",
  textDecoration: "underline",
};
