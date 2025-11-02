import React from "react";

function NoteCard({ note, selectedNote, onSelect, onDelete }) {
  return (
    <div
      className={`note-card ${selectedNote?.id === note.id ? "selected" : ""}`}
      style={{ background: note.color || "#fff8c4" }}
      onClick={() => onSelect(note)}
    >
      <h3>{note.title}</h3>
      <p>
        {note.content.substring(0, 150)}
        {note.content.length > 150 ? "..." : ""}
      </p>
      <p className="note-time">
        {note.updated_at && note.updated_at !== note.created_at
          ? `Updated: ${new Date(note.updated_at).toLocaleString()}`
          : `Created: ${new Date(note.created_at).toLocaleString()}`}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
      >
        ✖
      </button>
    </div>
  );
}

export default NoteCard;
