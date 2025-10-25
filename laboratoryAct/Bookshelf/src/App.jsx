import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Books from "./components/Books";
import Authors from "./components/Authors";
import Categories from "./components/Categories";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <h1 className="logo">📚 Bookshelf</h1>
          <nav>
            <NavLink to="/books" className="nav-item">Books</NavLink>
            <NavLink to="/authors" className="nav-item">Authors</NavLink>
            <NavLink to="/categories" className="nav-item">Categories</NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
