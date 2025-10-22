const API_URL = "http://localhost:3000"; // backend URL

// ==================== AUTH ====================

export async function registerUser(email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// ==================== NOTES CRUD ====================

// 🟢 Fetch all notes (includes created_at, updated_at)
export async function getNotes(token) {
  const res = await fetch(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error("Failed to fetch notes");
    return [];
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

// 🟡 Create a new note
export async function createNote(token, title, content) {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    console.error("Failed to create note");
  }

  return res.json();
}

// 🟠 Update a note (backend will auto-update updated_at)
export async function updateNote(token, id, title, content) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    console.error("Failed to update note");
  }

  return res.json();
}

// 🔴 Delete a note
export async function deleteNote(token, id) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error("Failed to delete note");
  }

  return res.json();
}
