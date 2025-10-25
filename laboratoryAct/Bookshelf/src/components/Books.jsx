import React, { useState, useEffect } from "react";
import "../App.css";
import api, { API_ORIGIN } from "../apiClient";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("author");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  // helper to allow other handlers to trigger a full refresh
  const [reload, setReload] = useState(null);

  // Load data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        const [booksData, authorsData, categoriesData] = await Promise.all([
          api.getBooks(),
          api.getAuthors(),
          api.getCategories()
        ]);
        setBooks(booksData);
        setAuthors(authorsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };
    loadData();
    // expose a reload function for reuse
    setReload(() => loadData);
    // Listen for categories updates from Categories page to refresh dropdowns
    const refreshCategories = async () => {
      try {
        const fresh = await api.getCategories();
        setCategories(fresh);
      } catch (e) {
        console.error("Failed to refresh categories", e);
      }
    };
    const refreshBooks = () => loadData();
    window.addEventListener('categoriesUpdated', refreshCategories);
    // Also refresh when other pages announce that books changed
    window.addEventListener('booksUpdated', refreshBooks);
    return () => {
      window.removeEventListener('categoriesUpdated', refreshCategories);
      window.removeEventListener('booksUpdated', refreshBooks);
    };
  }, []);

  // Treat coverImage as valid only if it looks like an actual image src (URL, data URI, or relative path)
  const isValidImageSrc = (src) => {
    if (!src || typeof src !== 'string') return false;
    // Accept: http/https URLs, data:image URIs, or app/host-relative paths like /uploads/..., ./uploads/..., ../uploads/...
    return /^(https?:\/\/|data:image\/|\/|\.\/|\.\.\/)/i.test(src) || src.startsWith('uploads/');
  };

  const filteredBooks = books
    .filter((book) => {
      const bookCategoryName = book.category?.name || "";
      const matchesCategory =
        selectedCategory === "All" || selectedCategory === "" || bookCategoryName === selectedCategory;
      const bookAuthorName = book.author?.name || "";
      const matchesSearch =
        (book.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookAuthorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookCategoryName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "title") return (a.title || "").localeCompare(b.title || "");
      if (sortOption === "author") {
        const aAuthor = a.author?.name || "";
        const bAuthor = b.author?.name || "";
        return aAuthor.localeCompare(bAuthor);
      }
      return 0;
    });

  const openModal = (book) => {
    setCurrentBook({ 
      ...book, 
      authorId: book.author?.id || book.authorId || "",
      authorName: book.author?.name || book.authorName || "",
      categoryId: book.category?.id || book.categoryId || ""
    });
    setIsEditing(false);
    setIsNew(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentBook(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the file object for upload
      setCurrentBook((prev) => ({ ...prev, coverImageFile: file }));
      
      // Also create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentBook((prev) => ({ ...prev, coverImagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSave = async () => {
    try {
      // Validate required fields
      const title = (currentBook.title || "").trim();
      const authorName = (currentBook.authorName || "").trim();
      const categoryId = currentBook.categoryId || "";

      if (!title || !authorName || !categoryId) {
        alert("Please fill out Title, Author, and Category.");
        return;
      }

      // Resolve authorId from entered name (create if not existing)
      let resolvedAuthorId = currentBook.authorId;
      try {
        if (!resolvedAuthorId && authorName) {
          const match = authors.find(a => (a.name || "").toLowerCase() === authorName.toLowerCase());
          if (match) {
            resolvedAuthorId = match.id;
          } else {
            const created = await api.createAuthor({ name: authorName });
            resolvedAuthorId = created.id;
            setAuthors(prev => [...prev, created]);
          }
        }
      } catch (e) {
        console.error("Author lookup/create failed", e);
        alert("Could not create or find the author.");
        return;
      }

      if (isNew) {
        // Pre-flight duplicate check on client for better UX (server also validates)
        const normTitle = title.toLowerCase();
        const authorIdNum = resolvedAuthorId ? Number(resolvedAuthorId) : null;
        const categoryIdNum = categoryId ? Number(categoryId) : null;
        const duplicate = books.some(b =>
          (b.title || '').trim().toLowerCase() === normTitle &&
          ((b.author?.id ?? b.authorId ?? null) === authorIdNum) &&
          ((b.category?.id ?? b.categoryId ?? null) === categoryIdNum)
        );
        if (duplicate) {
          alert('A book with the same Title, Author, and Category already exists.');
          return;
        }
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', currentBook.description || '');
        formData.append('feedback', currentBook.feedback || '');
        if (resolvedAuthorId) formData.append('authorId', resolvedAuthorId);
        if (categoryId) formData.append('categoryId', categoryId);
        if (currentBook.coverImageFile) formData.append('coverImage', currentBook.coverImageFile);

        const newBook = await api.createBook(formData);
        // refresh from server to ensure persistence and relations
        try { await (reload ? reload() : Promise.resolve()); } catch {}
        // notify other pages to refresh category counts
        window.dispatchEvent(new CustomEvent('booksUpdated', { detail: { action: 'create', book: newBook } }));
        setIsNew(false);
        setIsEditing(false);
        closeModal();
        return;
      }

      // Update existing book
  const formData = new FormData();
  formData.append('title', title);
      formData.append('description', currentBook.description || '');
      formData.append('feedback', currentBook.feedback || '');
  if (resolvedAuthorId) formData.append('authorId', resolvedAuthorId);
  if (categoryId) formData.append('categoryId', categoryId);
      if (currentBook.coverImageFile) formData.append('coverImage', currentBook.coverImageFile);

      const updatedBook = await api.updateBook(currentBook.id, formData);
      try { await (reload ? reload() : Promise.resolve()); } catch {}
      window.dispatchEvent(new CustomEvent('booksUpdated', { detail: { action: 'update', book: updatedBook } }));
      setIsEditing(false);
      closeModal();
    } catch (err) {
      console.error("Failed to save book", err);
      alert(`Failed to save book: ${err?.message || 'Unknown error'}`);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteBook(currentBook.id);
      try { await (reload ? reload() : Promise.resolve()); } catch {}
      window.dispatchEvent(new CustomEvent('booksUpdated', { detail: { action: 'delete', id: currentBook.id } }));
      closeModal();
    } catch (err) {
      console.error("Failed to delete book", err);
      alert("Failed to delete book. Make sure the backend is running.");
    }
  };

  const openAddModal = () => {
    setCurrentBook({ 
      title: "", 
      authorId: "", 
      authorName: "",
      categoryId: "", 
      description: "", 
      feedback: "", 
      coverImage: "" 
    });
    setIsNew(true);
    setIsEditing(true);
    setModalOpen(true);
  };

  return (
    <div className="main-content">
      <div className="books-header">
        <h1 className="page-title">📚 My Bookshelves</h1>

        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <input
              type="text"
              className="search-bar"
              placeholder="Search by title, author, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '350px', padding: '9px 12px' }}
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ 
                width: '200px', 
                padding: '9px 12px', 
                borderRadius: '10px', 
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                backgroundColor: '#f1f5f9',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <select
            className="sort-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              padding: '9px 14px',
              borderRadius: '10px',
              fontSize: '14px'
            }}
          >
            <option value="author">Sort by Author Name</option>
            <option value="title">Sort by Title</option>
          </select>

          <button 
            className="add-btn" 
            onClick={openAddModal} 
            style={{ 
              marginLeft: '0.6rem',
              padding: '10px 16px',
              backgroundColor: '#ffae42',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '1'
            }}
          >
            Add Book
          </button>
        </div>
      </div>

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="book-card"
              onClick={() => openModal(book)}
            >
              <div className="book-cover-wrapper">
                {isValidImageSrc(book.coverImage) ? (
                  <img
                    src={book.coverImage?.startsWith('/uploads') ? `${API_ORIGIN}${book.coverImage}` : book.coverImage}
                    alt={book.title}
                    className="realistic-cover"
                  />
                ) : (
                  <div
                    className="book-cover-placeholder"
                    title="No cover image"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#f1f5f9',
                      color: '#94a3b8',
                      fontSize: '40px',
                      userSelect: 'none'
                    }}
                  >
                    +
                  </div>
                )}
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">{book.author?.name || 'Unknown Author'}</p>
                <p className="category">{book.category?.name || 'No Category'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No books found.</p>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && currentBook && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📖 Book Information</h2>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-form">
              <div style={{ marginBottom: '10px' }}>
                {isValidImageSrc(currentBook.coverImage) || currentBook.coverImagePreview ? (
                  <img
                    src={currentBook.coverImagePreview || (currentBook.coverImage?.startsWith('/uploads') ? `${API_ORIGIN}${currentBook.coverImage}` : currentBook.coverImage)}
                    alt="Book cover preview"
                    style={{ maxWidth: '150px', maxHeight: '200px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="book-cover-placeholder"
                    title="No cover image"
                    style={{
                      width: '150px',
                      height: '200px',
                      borderRadius: '8px',
                      background: '#f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#94a3b8',
                      fontSize: '40px',
                      border: '1px dashed #cbd5e1'
                    }}
                  >
                    +
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={!isEditing}
                style={{ 
                  padding: '8px', 
                  border: '1px solid #cbd5e1', 
                  borderRadius: '8px',
                  width: '100%',
                  fontSize: '14px',
                  marginBottom: '15px'
                }}
              />

              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={currentBook.title}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />

              <label>Author:</label>
              <input
                type="text"
                name="authorName"
                value={currentBook.authorName || ""}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />

              <label>Category:</label>
              <select
                name="categoryId"
                value={currentBook.categoryId || ""}
                onChange={handleChange}
                disabled={!isEditing}
                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <label>Description:</label>
              <textarea
                name="description"
                value={currentBook.description || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <label>Feedback:</label>
              <textarea
                name="feedback"
                value={currentBook.feedback || ""}
                onChange={handleChange}
                disabled={!isEditing && !isNew}
              />
              </div>

              <div className="modal-buttons">
              {isEditing ? (
                <>
                  <button className="save-btn" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={closeModal}
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
                  <button className="delete-btn" onClick={handleDelete}>
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