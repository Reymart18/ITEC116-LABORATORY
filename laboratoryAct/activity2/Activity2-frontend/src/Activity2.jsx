import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import NotesDashboard from "./NotesDashboard";
import "./Activity2.css";

function Activity2({ onBack }) {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Load saved token from localStorage when app starts
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setUser(savedToken);
    }
  }, []);

  // ✅ Save token to localStorage when user logs in
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
  };

  // ✅ Remove token when logging out
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleRegister = () => {
    setShowRegister(false);
    setSuccessMessage("Registration successful! You can now log in.");
  };

  return (
    <div className={`activity2-container ${user ? "logged-in" : ""}`}>
      {!user ? (
        showRegister ? (
          <>
            <Register
              onRegister={handleRegister}
              onSwitch={() => setShowRegister(false)}
            />
            <button className="back-btn" onClick={onBack}>
              ⬅ Back to Menu
            </button>
          </>
        ) : (
          <>
            {successMessage && <p className="success-msg">{successMessage}</p>}
            <Login
              onLogin={handleLogin}
              onSwitch={() => setShowRegister(true)}
            />
          </>
        )
      ) : (
        <NotesDashboard token={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default Activity2;
