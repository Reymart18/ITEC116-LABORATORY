import React, { useState, useEffect, useCallback } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "./api";
import "./NotesDashboard.css";

function NotesDashboard({ token }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.body.classList.add("dashboard-page");
    return () => document.body.classList.remove("dashboard-page");
  }, []);

  const fetchNotes = useCallback(async () => {
    const res = await getNotes(token);
    setNotes(res);
  }, [token]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreate = async () => {
    if (!title || !content) return;
    await createNote(token, title, content);
    setTitle("");
    setContent("");
    setShowForm(false);
    fetchNotes();
  };

  const handleUpdate = async () => {
    if (!selectedNote) return;
    await updateNote(token, selectedNote.id, title, content);
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setShowForm(false);
    setIsEditing(false);
    fetchNotes();
  };

  const handleDelete = async (noteId) => {
    await deleteNote(token, noteId);
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setShowForm(false);
      setIsEditing(false);
    }
    fetchNotes();
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(true);
    setShowForm(true); // Show the form beside sidebar immediately
  };

  const handleAddClick = () => {
    setShowForm(!showForm);
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setIsEditing(false);
  };

  return (
    <div className="notes-dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Notes</h2>
        <div className="add-note-btn" onClick={handleAddClick}>
          +
        </div>
      </div>

      {/* Inline Form (for both Add & Edit) */}
      {showForm && (
        <div className="note-form-inline show">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {isEditing ? (
            <button onClick={handleUpdate}>Update</button>
          ) : (
            <button onClick={handleCreate}>Add</button>
          )}
        </div>
      )}

      {/* Notes Board */}
      <div className="notes-board">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note-card ${
              selectedNote?.id === note.id ? "selected" : ""
            }`}
            style={{ background: note.color || "#fff8c4" }}
            onClick={() => handleSelectNote(note)}
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
                handleDelete(note.id);
              }}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesDashboard;

