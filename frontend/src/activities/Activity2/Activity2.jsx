import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import NotesDashboard from "./NotesDashboard";
import "../Activity2/Activity2.css";

const Activity2 = ({ onBack }) => {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = (email) => {
    setUser(email);
    setSuccessMessage("");
  };

  // ✅ When successfully registered, show success message and return to login
  const handleRegister = () => {
    setSuccessMessage("✅ Registration successful! Please log in to continue.");
    setShowRegister(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowRegister(false);
    setSuccessMessage("");
  };

  return (
    <div className="activity2-wrapper">
      <div className="activity2-card">
        {!user ? (
          showRegister ? (
            <>
              <Register
                onRegister={handleRegister}
                onSwitch={() => setShowRegister(false)}
              />
              {/* ✅ Show Back button only in login/register view */}
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
              {/* ✅ Show Back button only in login/register view */}
              <button className="back-btn" onClick={onBack}>
                ⬅ Back to Menu
              </button>
            </>
          )
        ) : (
          // 🚫 NotesDashboard (with logout) → no Back button
          <div className="dashboard-wrapper">
            <div className="dashboard-header">
              <h2>Welcome to Your Notes</h2>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
            <NotesDashboard token={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity2;
