import React, { useState } from "react";
import "../App.css";
import api from "../apiClient";

function Authors() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [newAuthorName, setNewAuthorName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [authors, setAuthors] = useState([]);

  const handleAdd = () => setShowAddModal(true);
  
  const handleCreateAuthor = async () => {
    const fullName = newAuthorName.trim();
    if (fullName) {
      // Prevent duplicates (case-insensitive)
      const exists = authors.some(
        (a) => (a.name || '').trim().toLowerCase() === fullName.toLowerCase()
      );
      if (exists) {
        alert('Author already exists!');
        return;
      }
      try {
        const newAuthor = await api.createAuthor({ name: fullName });
        setAuthors([...authors, { id: newAuthor.id, name: newAuthor.name, books: 0 }]);
        setNewAuthorName("");
        setShowAddModal(false);
      } catch (err) {
        console.error("Failed to create author", err);
        alert("Failed to create author. Make sure the backend is running.");
      }
    }
  };

  // Load authors and compute book counts from the books list
  React.useEffect(() => {
    const load = async () => {
      try {
        const [authorsData, booksData] = await Promise.all([
          api.getAuthors(),
          api.getBooks(),
        ]);

        const countsByAuthor = booksData.reduce((acc, b) => {
          const id = (b.author && b.author.id) || b.authorId;
          if (id) acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {});

        setAuthors(
          authorsData.map((a) => ({
            id: a.id,
            name: a.name,
            books: countsByAuthor[a.id] || 0,
          }))
        );
      } catch (err) {
        console.error("Failed to load authors", err);
      }
    };
    load();

    // Refresh counts whenever books are created/updated/deleted
    const onBooksUpdated = () => load();
    window.addEventListener("booksUpdated", onBooksUpdated);
    return () => window.removeEventListener("booksUpdated", onBooksUpdated);
  }, []);

  const handleSort = (list) => {
    if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "books") return [...list].sort((a, b) => b.books - a.books);
    return list;
  };

  const filtered = handleSort(
    authors.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleOpenEdit = (author) => {
    setSelectedAuthor(author);
    setIsEditing(false);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteAuthor(id);
      setAuthors(authors.filter((a) => a.id !== id));
      setShowEditModal(false);
      setIsEditing(false);
      // Notify other pages (Books, Categories, etc.) to refresh counts and book author displays
      window.dispatchEvent(new CustomEvent('booksUpdated', { detail: { action: 'author-deleted', authorId: id } }));
    } catch (err) {
      console.error("Failed to delete author", err);
      alert("Failed to delete author. Make sure the backend is running.");
    }
  };

  const handleSaveEdit = async () => {
    try {
      const trimmed = (selectedAuthor.name || '').trim();
      if (!trimmed) {
        alert('Name cannot be empty.');
        return;
      }
      // Duplicate guard (exclude the one being edited)
      const exists = authors.some(
        (a) => a.id !== selectedAuthor.id && (a.name || '').trim().toLowerCase() === trimmed.toLowerCase()
      );
      if (exists) {
        alert('Author already exists!');
        return;
      }
      await api.updateAuthor(selectedAuthor.id, { name: trimmed });
      setAuthors(
        authors.map((a) =>
          a.id === selectedAuthor.id ? { ...selectedAuthor, name: trimmed } : a
        )
      );
      setIsEditing(false);
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update author", err);
      alert("Failed to update author. Make sure the backend is running.");
    }
  };

  return (
    <div className="authors-main">
      <div className="authors-header">
        <h2 className="page-title">Authors</h2>

        <div
          className="top-controls"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "10px",
          }}
        >
          <div
            className="search-stack"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                width: "135px",
                fontSize: "14px",
                padding: "9px 12px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#f1f5f9",
              }}
            >
              <option value="name">Sort by Name</option>
              <option value="books">Sort by Count</option>
            </select>

            <input
              type="text"
              className="search-bar"
              placeholder="Search Authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: "350px",
                padding: "9px 12px",
                fontSize: "14px",
              }}
            />

            <button
              className="add-btn"
              onClick={handleAdd}
              style={{
                padding: "9px 20px",
                backgroundColor: "#FFAE42",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              + Add Author
            </button>
          </div>
        </div>
      </div>

      {/* Author Cards */}
      <div className="authors-grid">
        {filtered.length > 0 ? (
          filtered.map((author) => (
            <div
              className="author-card"
              key={author.id}
              onClick={() => handleOpenEdit(author)}
              style={{ cursor: "pointer" }}
            >
              <div className="author-avatar avatar-enhanced">
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <h3 className="author-name">{author.name}</h3>
              <p className="author-books">
                {author.books} {author.books === 1 ? "Book" : "Books"}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "1rem", gridColumn: "1 / -1", fontStyle: "normal" }}>No authors found.</p>
        )}
      </div>

      {/* Add Author Modal (uses common modal classes) */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Author</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                &times;
              </button>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-form">
                <label>Full Name</label>
                <input
                  type="text"
                  value={newAuthorName}
                  onChange={(e) => setNewAuthorName(e.target.value)}
                />
              </div>

              <div className="modal-buttons">
                <button className="save-btn" onClick={handleCreateAuthor}>
                  Create Author
                </button>
                <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Delete Modal (uses common modal classes) */}
      {showEditModal && selectedAuthor && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Author Information</h2>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>
                &times;
              </button>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-form">
                <label>Full Name</label>
                <input
                  type="text"
                  value={selectedAuthor.name}
                  onChange={(e) => setSelectedAuthor({ ...selectedAuthor, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="modal-buttons">
                {isEditing ? (
                  <>
                    <button className="save-btn" onClick={handleSaveEdit}>
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(selectedAuthor.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Authors;
