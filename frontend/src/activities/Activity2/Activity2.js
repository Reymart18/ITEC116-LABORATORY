import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import NotesDashboard from "./NotesDashboard";
import "./Activity2.css"; // We'll create this CSS

const Activity2 = () => {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // Handle login/register
  const handleLogin = (email) => setUser(email);
  const handleRegister = (email) => setUser(email);
  const handleLogout = () => {
    setUser(null);
    setShowRegister(false);
  };

  return (
    <div className="activity2-wrapper">
      <div className="activity2-card">
        {!user ? (
          showRegister ? (
            <Register
              onRegister={handleRegister}
              onSwitch={() => setShowRegister(false)}
            />
          ) : (
            <Login
              onLogin={handleLogin}
              onSwitch={() => setShowRegister(true)}
            />
          )
        ) : (
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
