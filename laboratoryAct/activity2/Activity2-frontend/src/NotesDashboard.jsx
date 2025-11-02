import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { getNotes, createNote, updateNote, deleteNote } from "./api";
import Sidebar from "./components/Sidebar";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import "./NotesDashboard.css";

function NotesDashboard({ token, onLogout }) {
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
    if (!title || !content) {
      Swal.fire("Missing Fields", "Please enter title and content", "warning");
      return;
    }
    await createNote(token, title, content);
    setTitle("");
    setContent("");
    setShowForm(false);
    fetchNotes();
    Swal.fire("Created!", "Note has been added successfully", "success");
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
    Swal.fire("Updated!", "Note has been updated", "success");
  };

  const handleDelete = async (noteId) => {
    const result = await Swal.fire({
      title: "Delete this note?",
      text: "You cannot undo this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    await deleteNote(token, noteId);
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setShowForm(false);
      setIsEditing(false);
    }
    fetchNotes();
    Swal.fire("Deleted!", "Note has been deleted", "success");
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setShowForm(!showForm);
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setIsEditing(false);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Log out?",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, log out",
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");
    if (onLogout) onLogout();
  };

  return (
    <div className="notes-dashboard-layout">
      <Sidebar onAddClick={handleAddClick} onLogout={handleLogout} />
      {showForm && (
        <NoteForm
          title={title}
          content={content}
          isEditing={isEditing}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
      <div className="notes-board">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            selectedNote={selectedNote}
            onSelect={handleSelectNote}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default NotesDashboard;
