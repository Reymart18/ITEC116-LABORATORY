import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const postsPerPage = 3;

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
    setCurrentPage(0);
    setShowModal(false);
  };

  const updateComments = (postId, newComment) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, comments: [...(post.comments || []), newComment] } : post
      )
    );
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      )
    );
  };

  const handlePostDeleted = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    // Adjust current page if necessary
    const newTotalPages = Math.ceil((posts.length - 1) / postsPerPage);
    if (currentPage >= newTotalPages && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = currentPage * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", padding: "0" }}>
      <div style={{ maxWidth: "100%", margin: "0", padding: "20px 20px" }}>
        
        {/* Header Section */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "15px"
        }}>
          <h2 style={{ 
            fontSize: "24px", 
            fontWeight: "700", 
            color: "#2d3748",
            textTransform: "uppercase",
            letterSpacing: "1px",
            margin: 0
          }}>
            POST AND UPDATES
          </h2>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              background: "#667eea",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "12px 28px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              textTransform: "uppercase",
              boxShadow: "0 2px 6px rgba(102, 126, 234, 0.4)"
            }}
          >
            CREATE NEW POST
          </button>
        </div>

        {/* Posts Carousel Container */}
        <div style={{ position: "relative", padding: "0" }}>
          
          {/* Previous Arrow */}
          {currentPage > 0 && (
            <button 
              onClick={handlePrevious}
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                background: "#2d3748",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                fontSize: "30px",
                cursor: "pointer",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
              }}
            >
              ‹
            </button>
          )}

          {/* Posts Grid */}
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            minHeight: "600px",
            padding: "0 60px"
          }}>
            {posts.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#666", padding: "40px" }}>
                No posts yet
              </div>
            ) : (
              currentPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onCommentAdded={updateComments}
                  onPostUpdated={handlePostUpdated}
                  onPostDeleted={handlePostDeleted}
                />
              ))
            )}
          </div>

          {/* Next Arrow */}
          {currentPage < totalPages - 1 && posts.length > 0 && (
            <button 
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "0",
                top: "50%",
                transform: "translateY(-50%)",
                background: "#2d3748",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                fontSize: "30px",
                cursor: "pointer",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
              }}
            >
              ›
            </button>
          )}
        </div>

        {/* Page Indicator */}
        {posts.length > 0 && totalPages > 1 && (
          <div style={{ 
            textAlign: "center", 
            marginTop: "30px", 
            color: "#666",
            fontSize: "14px"
          }}>
            Page {currentPage + 1} of {totalPages}
          </div>
        )}

      </div>

      {/* Modal for Create Post */}
      {showModal && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "30px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#999"
              }}
            >
              ×
            </button>
            <PostForm onAddPost={addPost} />
          </div>
        </div>
      )}
    </div>
  );
}
