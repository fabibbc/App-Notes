// src/components/AddNote.js
import React, { useState } from "react";
import axios from "axios";

const AddNote = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      return alert("Please fill in both fields.");
    }

    try {
      const response = await axios.post("http://localhost:5000/api/notes", {
        title,
        content,
      });
      onNoteAdded(response.data); // Notify parent to update notes
      setTitle(""); // Clear form fields
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Note</h3>
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;
