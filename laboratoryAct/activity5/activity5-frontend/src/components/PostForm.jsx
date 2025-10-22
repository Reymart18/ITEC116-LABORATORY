import React, { useState, useRef } from "react";

export default function PostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(); // ✅ Add this

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title && !file) return alert("Enter title or choose a file");

    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in first");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      if (!res.ok) throw new Error("Failed to create post");
      const newPost = await res.json();
      onAddPost(newPost);

      // Reset fields
      setTitle("");
      setContent("");
      setFile(null);

      // ✅ Reset the file input visually
      fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      alert("Error creating post");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ marginBottom: "15px", color: "#FF6347" }}>Create New Post</h2>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Post Title" required style={inputStyle}/>
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" style={textareaStyle}/>
      <input ref={fileInputRef} type="file" onChange={e => setFile(e.target.files[0])} style={{ marginBottom: "10px" }} />
      <button type="submit" style={submitBtn}>Add Post</button>
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
