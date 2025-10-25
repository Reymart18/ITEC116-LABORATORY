const API_URL = "http://localhost:3000/api";
// Expose API origin so UI can build absolute URLs for assets like /uploads/...
export const API_ORIGIN = API_URL.replace(/\/?api\/?$/, "");

const api = {
  // Books
  getBooks: async () => {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
  getBook: async (id) => {
    const response = await fetch(`${API_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch book ${id}: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
  createBook: async (formData) => {
    const response = await fetch(`${API_URL}/books`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `Failed to create book: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
  updateBook: async (id, formData) => {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "PATCH",
      body: formData,
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `Failed to update book: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
  deleteBook: async (id) => {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `Failed to delete book: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  // Authors
  getAuthors: async () => {
    const response = await fetch(`${API_URL}/authors`);
    return response.json();
  },
  createAuthor: async (data) => {
    const response = await fetch(`${API_URL}/authors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  updateAuthor: async (id, data) => {
    const response = await fetch(`${API_URL}/authors/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  deleteAuthor: async (id) => {
    const response = await fetch(`${API_URL}/authors/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },

  // Categories
  getCategories: async () => {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return response.json();
  },
  createCategory: async (data) => {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Failed to create category: ${response.statusText}`);
    }
    return response.json();
  },
  updateCategory: async (id, data) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Failed to update category: ${response.statusText}`);
    }
    return response.json();
  },
  deleteCategory: async (id) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete category: ${response.statusText}`);
    }
    return response.json();
  },

  // Genres
  getGenres: async () => {
    const response = await fetch(`${API_URL}/genres`);
    return response.json();
  },
  createGenre: async (data) => {
    const response = await fetch(`${API_URL}/genres`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  updateGenre: async (id, data) => {
    const response = await fetch(`${API_URL}/genres/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  deleteGenre: async (id) => {
    const response = await fetch(`${API_URL}/genres/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};

export default api;
