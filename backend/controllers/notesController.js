// backend/controllers/noteController.js
const Note = require("../models/Note");

// Obtener todas las notas del usuario
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

// Crear una nueva nota
const createNote = async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const note = new Note({
      user: req.user,
      title,
      content,
      category,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
};

// Actualizar una nota
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.user },
      { title, content, category },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error updating note" });
  }
};

// Eliminar una nota
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.user });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
