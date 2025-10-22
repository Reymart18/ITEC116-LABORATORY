import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:3001/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const addPost = (post) => {
    setPosts(prev => [post, ...prev]);
  };

  const updateComments = (postId, newComment) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, comments: [...(post.comments || []), newComment] } : post
      )
    );
  };

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "0 15px" }}>
      <PostForm onAddPost={addPost} />
      <div style={{ marginTop: "30px" }}>
        {posts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>No posts yet</p>
        ) : (
          posts.map(post => <PostCard key={post.id} post={post} onCommentAdded={updateComments} />)
        )}
      </div>
    </div>
  );
}
