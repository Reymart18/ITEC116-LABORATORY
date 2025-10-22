import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

export default function BlogApp() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleLogin = () => setCurrentPage("home");
  const handleRegister = () => setCurrentPage("login");

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f4f4f9", minHeight: "100vh" }}>
      <Header setCurrentPage={setCurrentPage} />
      {currentPage === "home" && <Home />}
      {currentPage === "login" && <Login onLogin={handleLogin} />}
      {currentPage === "register" && <Register onRegister={handleRegister} />}
    </div>
  );
}
