import React, { useState, useEffect, useCallback } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "./api";
import "../Activity2/NotesDashboard.css";

function NotesDashboard({ token }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
      <div className="dashboard-header">
        <h2>📝 My Notes</h2>
      </div>

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
            <p>
              {note.content.substring(0, 150)}
              {note.content.length > 150 ? "..." : ""}
            </p>

            {/* 🕒 Show Created/Updated timestamps safely */}
            <p>
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
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default NotesDashboard;
