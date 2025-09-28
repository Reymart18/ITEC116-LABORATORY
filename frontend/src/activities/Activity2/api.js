const API_URL = "http://localhost:3000"; // backend URL

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

// Notes CRUD

export async function getNotes(token) {
  const res = await fetch(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function createNote(token, title, content) {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

export async function updateNote(token, id, title, content) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

export async function deleteNote(token, id) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
