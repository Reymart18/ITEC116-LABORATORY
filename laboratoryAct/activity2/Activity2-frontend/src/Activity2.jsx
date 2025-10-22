import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import NotesDashboard from "./NotesDashboard";
import "./Activity2.css";

function Activity2({ onBack }) {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = (token) => setUser(token);
  const handleLogout = () => setUser(null);
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
