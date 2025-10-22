import React, { useState, useEffect } from "react";
import Comment from "./Comment";

export default function PostCard({ post, onCommentAdded }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => { fetchComments(); }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:3001/comments/${post.id}`);
      const data = await res.json();
      setComments(data);
    } catch (err) { console.error("Failed to fetch comments:", err); }
  };

  const handleAddComment = async () => {
    if (!newComment && !file) return alert("Enter a comment or select a file");

    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to comment");

    const formData = new FormData();
    formData.append("content", newComment);
    if (file) formData.append("file", file);

    try {
      const res = await fetch(`http://localhost:3001/comments/${post.id}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      if (!res.ok) throw new Error("Failed to post comment");
      const savedComment = await res.json();

      setComments(prev => [...prev, savedComment]);
      setNewComment("");
      setFile(null);
      onCommentAdded(post.id, savedComment);
    } catch (err) {
      console.error(err);
      alert("Error posting comment");
    }
  };

  const handleReply = async (parentId, replyContent, replyFile) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to reply");

    const formData = new FormData();
    formData.append("content", replyContent);
    if (replyFile) formData.append("file", replyFile);

    try {
      const res = await fetch(`http://localhost:3001/comments/${post.id}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error("Failed to post reply");
      const savedReply = await res.json();

      const addReplyRecursively = (commentList) =>
        commentList.map(c => {
          if (c.id === parentId) return { ...c, replies: [...(c.replies || []), savedReply] };
          if (c.replies) return { ...c, replies: addReplyRecursively(c.replies) };
          return c;
        });

      setComments(prev => addReplyRecursively(prev));
      onCommentAdded(post.id, savedReply);
    } catch (err) {
      console.error(err);
      alert("Error posting reply");
    }
  };

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", marginBottom: "15px", boxShadow: "0 3px 10px rgba(0,0,0,0.08)" }}>
      <h3 style={{ color: "#FF6347" }}>{post.title}</h3>
      <p style={{ color: "#333" }}>{post.content}</p>

      {/* Display uploaded post image */}
      {post.mediaUrl && (
        <div style={{ marginTop: "10px" }}>
          <img src={post.mediaUrl} alt="Post Media" style={{ maxWidth: "100%", borderRadius: "6px" }} />
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <textarea placeholder="Write a comment..." value={newComment} onChange={e=>setNewComment(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "8px" }} />
        <input type="file" onChange={e => setFile(e.target.files[0])} style={{ marginBottom: "8px" }} />
        <button onClick={handleAddComment} style={{ background: "#FF6347", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: "pointer" }}>Comment</button>
      </div>

      <div style={{ marginTop: "15px" }}>
        {comments.map(c => <Comment key={c.id} comment={c} onReply={handleReply} />)}
      </div>
    </div>
  );
}