// src/components/Notes.js
import React, { useState } from "react";
import NotesList from "./NotesList";
import AddNote from "./AddNote";

const Notes = () => {
  const [setNotes] = useState([]);

  // Add a new note to the list
  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  return (
    <div>
      <h1>Notes</h1>
      <AddNote onNoteAdded={handleNoteAdded} />
      <NotesList />
    </div>
  );
};

export default Notes;
