// src/activities/Activity2/NotesDashboard.js
import React, { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "./api";
import "./NotesDashboard.css";

function NotesDashboard({ token }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await getNotes(token);
    setNotes(res);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async () => {
    if (!title || !content) return;
    await createNote(token, title, content);
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const handleUpdate = async () => {
    if (!selectedNote) return;
    await updateNote(token, selectedNote.id, title, content);
    setSelectedNote(null);
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const handleDelete = async (noteId) => {
    await deleteNote(token, noteId);
    if (selectedNote?.id === noteId) setSelectedNote(null);
    fetchNotes();
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="notes-dashboard-container">
      <h2>📝 My Notes</h2>

      <div className="note-form">
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
        {selectedNote ? (
          <button onClick={handleUpdate}>Update Note</button>
        ) : (
          <button onClick={handleCreate}>Add Note</button>
        )}
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note-card ${selectedNote?.id === note.id ? "selected" : ""}`}
            onClick={() => handleSelectNote(note)}
          >
            <h3>{note.title}</h3>
            <p>{note.content.substring(0, 50)}...</p>
            <button onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesDashboard;
