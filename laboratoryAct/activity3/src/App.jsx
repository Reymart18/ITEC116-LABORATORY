import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Books from "./components/Books";
import Authors from "./components/Authors";
import Categories from "./components/Categories";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className={`app-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <h1 className="logo">📚 Bookshelf</h1>
          <nav>
            <NavLink to="/books" className="nav-item">Books</NavLink>
            <NavLink to="/authors" className="nav-item">Authors</NavLink>
            <NavLink to="/categories" className="nav-item">Categories</NavLink>
          </nav>
        </aside>

        {/* Backdrop for small screens when sidebar is open */}
        {sidebarOpen && (
          <div
            className="sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <main className="main-content">
          {/* Hamburger visible on small screens */}
          <button
            className="hamburger"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={() => setSidebarOpen(s => !s)}
          >
            <span />
            <span />
            <span />
          </button>

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
