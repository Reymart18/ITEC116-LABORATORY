import React, { useState, useEffect } from "react";
import Comment from "./Comment";

export default function PostCard({ post, onCommentAdded, onPostUpdated, onPostDeleted }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [file, setFile] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);
  const [editFile, setEditFile] = useState(null);

  // Get current user ID from token
  const getCurrentUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.id || payload.userId;
    } catch (err) {
      return null;
    }
  };

  const currentUserId = getCurrentUserId();
  const isOwner = currentUserId && post.author?.id === currentUserId;

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

  const handleEditPost = async () => {
    if (!editTitle.trim()) return alert("Title is required");

    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in");

    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("content", editContent);
    if (editFile) formData.append("file", editFile);

    try {
      const res = await fetch(`http://localhost:3001/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      if (!res.ok) throw new Error("Failed to update post");
      const updatedPost = await res.json();

      setIsEditing(false);
      setEditFile(null);
      if (onPostUpdated) onPostUpdated(updatedPost);
      alert("Post updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating post");
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in");

    try {
      const res = await fetch(`http://localhost:3001/posts/${post.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to delete post");
      
      if (onPostDeleted) onPostDeleted(post.id);
      alert("Post deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting post");
    }
  };

  return (
    <div style={{ 
      background: "#fff", 
      backgroundImage: "url('/Myblog.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px", 
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      position: "relative"
    }}>
      {/* Author Header */}
      <div style={{ 
        padding: "15px", 
        background: "rgba(255, 255, 255, 0.95)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        borderBottom: "1px solid #e9ecef",
        position: "relative"
      }}>
        <div style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "18px",
          flexShrink: 0
        }}>
          {post.author?.email?.charAt(0)?.toUpperCase() || "A"}
        </div>
        <div style={{ overflow: "hidden", flex: 1, textAlign: "left" }}>
          <div style={{ 
            fontSize: "16px", 
            color: "#000",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "left",
            fontWeight: "600"
          }}>
            {post.author?.email || "Anonymous"}
          </div>
          <div style={{ 
            color: "#2d3748", 
            fontSize: "15px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "left"
          }}>
            {post.title}
          </div>
          {post.content && (
            <div style={{ 
              fontSize: "13px", 
              color: "#495057",
              marginTop: "8px",
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "left"
            }}>
              {post.content}
            </div>
          )}
        </div>

        {/* Three-dot menu for owner */}
        {isOwner && !isEditing && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                padding: "5px 10px",
                color: "#6c757d",
                fontWeight: "bold"
              }}
            >
              ⋯
            </button>
            {showMenu && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: "0",
                background: "#fff",
                border: "1px solid #e9ecef",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 100,
                minWidth: "140px"
              }}>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "10px 15px",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#2d3748"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L487.3 125.9 389.4 28 171.4 241.7zM64 112C28.7 112 0 140.7 0 176V448c0 35.3 28.7 64 64 64H336c35.3 0 64-28.7 64-64V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H64z"/>
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleDeletePost();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "10px 15px",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#dc3545",
                    borderTop: "1px solid #e9ecef"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Mode */}
      {isEditing ? (
        <div style={{ padding: "15px", background: "#f8f9fa" }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Post Title"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              boxSizing: "border-box"
            }}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Content"
            style={{
              width: "100%",
              padding: "10px",
              minHeight: "80px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              marginBottom: "10px",
              boxSizing: "border-box",
              fontFamily: "inherit"
            }}
          />
          <input
            type="file"
            onChange={(e) => setEditFile(e.target.files[0])}
            style={{ marginBottom: "10px", fontSize: "12px" }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleEditPost}
              style={{
                background: "#667eea",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500"
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditTitle(post.title);
                setEditContent(post.content);
                setEditFile(null);
              }}
              style={{
                background: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {/* Image Section - Fixed Height */}
      <div style={{ 
        height: "280px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: post.mediaUrl ? "#000" : "#d3d3d3",
        overflow: "hidden"
      }}>
        {post.mediaUrl ? (
          <img 
            src={post.mediaUrl} 
            alt="Post Media" 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover" 
            }} 
          />
        ) : (
          <div style={{ 
            fontSize: "20px", 
            fontWeight: "600", 
            color: "#666",
            textAlign: "center"
          }}>
            NO IMAGE
          </div>
        )}
      </div>

      {/* Scrollable Comments Section */}
      <div style={{ 
        height: "180px",
        overflowY: "auto",
        padding: "15px",
        background: "rgba(255, 255, 255, 0.95)",
        borderTop: "1px solid #e9ecef",
        borderBottom: "1px solid #e9ecef"
      }}>
        {comments.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999", fontSize: "13px", margin: "10px 0" }}>No comments yet</p>
        ) : (
          comments.map(c => <Comment key={c.id} comment={c} onReply={handleReply} />)
        )}
      </div>

      {/* Comment Input Section */}
      <div style={{ padding: "15px", background: "rgba(255, 255, 255, 0.95)", marginTop: "auto" }}>
        <textarea 
          placeholder="Write a comment..." 
          value={newComment} 
          onChange={e=>setNewComment(e.target.value)} 
          style={{ 
            width: "100%", 
            padding: "10px", 
            borderRadius: "4px", 
            border: "1px solid #ddd", 
            marginBottom: "10px",
            fontSize: "13px",
            fontFamily: "inherit",
            resize: "none",
            minHeight: "50px",
            boxSizing: "border-box"
          }} 
        />
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input 
            type="file" 
            onChange={e => setFile(e.target.files[0])} 
            style={{ flex: 1, fontSize: "12px" }} 
          />
          <button 
            onClick={handleAddComment} 
            style={{ 
              background: "#667eea", 
              color: "#fff", 
              border: "none", 
              borderRadius: "10px", 
              padding: "10px 20px", 
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "13px"
            }}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}