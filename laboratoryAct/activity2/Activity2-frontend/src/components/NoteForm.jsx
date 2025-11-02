import React from "react";

function NoteForm({
  title,
  content,
  isEditing,
  onTitleChange,
  onContentChange,
  onCreate,
  onUpdate,
}) {
  return (
    <div className="note-form-inline show">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      ></textarea>
      {isEditing ? (
        <button onClick={onUpdate}>Update</button>
      ) : (
        <button onClick={onCreate}>Add</button>
      )}
    </div>
  );
}

export default NoteForm;
