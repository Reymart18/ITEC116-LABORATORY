import React, { useState, useRef } from "react";
import Swal from "sweetalert2";

export default function PostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title && !file) {
      Swal.fire("Missing Data", "Enter a title or choose a file", "warning");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Unauthorized", "Please log in first", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create post");

      const newPost = await res.json();
      onAddPost(newPost);

      setTitle("");
      setContent("");
      setFile(null);
      fileInputRef.current.value = "";

      Swal.fire("Success", "Post created successfully!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Error creating post", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ marginBottom: "15px", color: "#FF6347" }}>Create New Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        required
        style={inputStyle}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        style={textareaStyle}
      />
      <input ref={fileInputRef} type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit" style={submitBtn}>
        Add Post
      </button>
    </form>
  );
}

const formStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 3px 12px rgba(0,0,0,0.1)"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px"
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  minHeight: "80px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
  marginBottom: "10px"
};

const submitBtn = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  background: "#FF6347",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s"
};
