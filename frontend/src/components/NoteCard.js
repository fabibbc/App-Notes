// src/components/NoteCard.js
import React from "react";

const NoteCard = ({ note }) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteCard;
