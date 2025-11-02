import React from "react";

function Sidebar({ onAddClick, onLogout }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Notes</h2>
      <div className="add-note-btn" onClick={onAddClick}>
        +
      </div>
      <button className="logout-btn" onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
}

export default Sidebar;
