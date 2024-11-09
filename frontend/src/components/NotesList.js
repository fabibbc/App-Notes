// src/components/NotesList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  // Fetch notes from the backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notes");
        setNotes(response.data); // Assuming backend returns an array of notes
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>
      <div>
        {notes.length === 0 ? (
          <p>No notes available. Add some!</p>
        ) : (
          notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;
