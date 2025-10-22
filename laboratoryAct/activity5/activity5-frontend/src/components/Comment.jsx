import React, { useState } from "react";

export default function Comment({ comment, onReply, onEdit, onDelete }) {
  const [reply, setReply] = useState("");
  const [replyFile, setReplyFile] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // ✅ key for file input reset

  const currentUserEmail = localStorage.getItem("email");

  const handleReply = () => {
    if (!reply && !replyFile) return alert("Enter a reply or select a file");

    onReply(comment.id, reply, replyFile);

    // Reset input fields after sending
    setReply("");
    setReplyFile(null);
    setShowReplyBox(false);
    setFileInputKey(Date.now()); // ✅ force file input reset
  };

  const handleEdit = () => {
    onEdit(comment.id, editContent);
    setEditMode(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div style={{ marginBottom: "15px", paddingLeft: comment.parent ? "20px" : "0" }}>
      <div style={commentBoxStyle}>
        <strong>{comment.author?.email}</strong>
        {editMode ? (
          <>
            <textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              style={textareaStyle}
            />
            <button onClick={handleEdit} style={btnStyle}>Save</button>
            <button onClick={() => setEditMode(false)} style={btnStyle}>Cancel</button>
          </>
        ) : (
          <>
            <p>{comment.content}</p>
            {comment.mediaUrl && (
              <div style={{ marginTop: "5px" }}>
                <img
                  src={comment.mediaUrl}
                  alt="Comment Media"
                  style={{ maxWidth: "100%", borderRadius: "4px" }}
                />
              </div>
            )}
            {comment.author?.email === currentUserEmail && (
              <>
                <button onClick={() => setEditMode(true)} style={btnStyle}>Edit</button>
                <button onClick={handleDelete} style={btnStyle}>Delete</button>
              </>
            )}
            <button onClick={() => setShowReplyBox(!showReplyBox)} style={btnStyle}>Reply</button>
          </>
        )}
      </div>

      {showReplyBox && (
        <div style={replyBoxStyle}>
          <textarea
            placeholder="Write a reply..."
            value={reply}
            onChange={e => setReply(e.target.value)}
            style={textareaStyle}
          />
          <input
            key={fileInputKey} // ✅ changing key resets file input
            type="file"
            onChange={e => setReplyFile(e.target.files[0])}
            style={{ marginBottom: "5px" }}
          />
          <button onClick={handleReply} style={replyBtnStyle}>Send</button>
        </div>
      )}

      {comment.replies?.length > 0 && comment.replies.map((r, i) => (
        <Comment
          key={i}
          comment={r}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

// Styles
const commentBoxStyle = {
  background: "#fafafa",
  padding: "10px",
  borderRadius: "6px"
};

const replyBoxStyle = {
  marginTop: "8px",
  marginLeft: "20px"
};

const textareaStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginBottom: "5px"
};

const btnStyle = {
  marginLeft: "5px",
  background: "none",
  border: "none",
  color: "#FF6347",
  cursor: "pointer"
};

const replyBtnStyle = {
  marginTop: "5px",
  background: "#FF6347",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "6px 12px",
  cursor: "pointer"
};
