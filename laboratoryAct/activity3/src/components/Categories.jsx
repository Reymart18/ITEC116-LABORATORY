import React, { useState, useMemo } from "react";
import "../App.css";
import api from "../apiClient";

const categoryIcons = { All: "📚" };

function Categories() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoriesState, setCategoriesState] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // helper: load categories and compute counts from books list
  const loadCategories = React.useCallback(async () => {
    try {
      const [categoriesData, booksData] = await Promise.all([
        api.getCategories(),
        api.getBooks(),
      ]);

      const countsByCategory = booksData.reduce((acc, b) => {
        const id = (b.category && b.category.id) || b.categoryId;
        if (id) acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});

      setCategoriesState(
        categoriesData.map((c) => ({
          id: c.id,
          name: c.name,
          count: countsByCategory[c.id] || 0,
          books: undefined,
        }))
      );
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  }, []);

  // Load categories on mount and when books change (to refresh counts)
  React.useEffect(() => {
    loadCategories();
    const onBooksUpdated = () => loadCategories();
    window.addEventListener("booksUpdated", onBooksUpdated);
    return () => window.removeEventListener("booksUpdated", onBooksUpdated);
  }, [loadCategories]);

  const addCategory = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed) {
      alert("Category name cannot be empty.");
      return;
    }

    // Check for duplicates
    const exists = categoriesState.some(
      (cat) => cat.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      alert("Category already exists!");
      return;
    }

    try {
      const newCat = await api.createCategory({ name: trimmed });
      setCategoriesState([...categoriesState, { id: newCat.id, name: newCat.name, count: 0, books: [] }]);
      setNewCategory("");
      setShowAddModal(false);
      // notify other pages (e.g., Books) to refresh categories dropdown
      window.dispatchEvent(new CustomEvent("categoriesUpdated", { detail: { action: "create", category: newCat } }));
    } catch (err) {
      console.error("Failed to create category", err);
      alert(err.message || "Failed to create category. Make sure the backend is running.");
    }
  };

  const filtered = categoriesState
    .filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "count") return b.count - a.count;
      return 0;
    });

  return (
    <div className="authors-main">
      <div className="authors-header">
        <h2 className="page-title">Categories</h2>

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
              <option value="count">Sort by Count</option>
            </select>

            <input
              type="text"
              className="search-bar"
              placeholder="Search Categories..."
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
              onClick={() => setShowAddModal(true)}
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
              + Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="authors-grid">
          {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "1rem", gridColumn: "1 / -1", fontStyle: "normal" }}>No categories found.</p>
        ) : (
          filtered.map((cat) => (
            <div
              className="author-card"
              key={cat.name}
              onClick={() => { 
                setEditingCategory(cat); 
                setIsEditing(false); 
                setShowEditModal(true); 
              }}
            >
              <div className="author-avatar avatar-enhanced">📚</div>
              <h3 className="author-name">{cat.name}</h3>
              <p className="author-books">
                {cat.count} Book{cat.count > 1 ? "s" : ""}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Category</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                &times;
              </button>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-form">
                <label>Enter Category</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>

              <div className="modal-buttons">
                <button
                  className="save-btn"
                  onClick={addCategory}
                >
                  Save
                </button>
                <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && editingCategory && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Category Information</h2>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>
                &times;
              </button>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-form">
                <label>Enter Category</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="modal-buttons">
                {isEditing ? (
                  <>
                    <button
                      className="save-btn"
                      onClick={async () => {
                        const trimmed = (editingCategory.name || '').trim();
                        if (!trimmed) return alert('Category name cannot be empty.');
                        // check duplicates excluding the one being edited
                        const originalCat = categoriesState.find(c => c.id === editingCategory.id);
                        const exists = categoriesState.some(c => c.name.toLowerCase() === trimmed.toLowerCase() && c.id !== editingCategory.id);
                        if (exists) return alert('Category already exists!');
                        
                        try {
                          await api.updateCategory(editingCategory.id, { name: trimmed });
                          setCategoriesState(categoriesState.map(c => c.id === editingCategory.id ? { ...c, name: trimmed } : c));
                          // notify
                          window.dispatchEvent(new CustomEvent("categoriesUpdated", { detail: { action: "update", category: { id: editingCategory.id, name: trimmed } } }));
                          setIsEditing(false);
                          setShowEditModal(false);
                        } catch (err) {
                          console.error("Failed to update category", err);
                          alert("Failed to update category. Make sure the backend is running.");
                        }
                      }}
                    >
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
                      onClick={async () => {
                        if (!confirm(`Delete category "${editingCategory.name}"?`)) return;
                        try {
                          await api.deleteCategory(editingCategory.id);
                          setCategoriesState(categoriesState.filter(c => c.id !== editingCategory.id));
                          // notify
                          window.dispatchEvent(new CustomEvent("categoriesUpdated", { detail: { action: "delete", id: editingCategory.id } }));
                          setIsEditing(false);
                          setShowEditModal(false);
                        } catch (err) {
                          console.error("Failed to delete category", err);
                          alert("Failed to delete category. Make sure the backend is running.");
                        }
                      }}
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

export default Categories;
