
// backend/routes/noteRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getNotes, createNote, updateNote, deleteNote } = require("../controllers/notesController");

// Rutas para las notas, protegidas con el middleware `auth`
router.get("/", auth, getNotes);
router.post("/", auth, createNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

module.exports = router;




// // routes/notes.js
// const express = require("express");
// const Note = require("../models/Note");
// const jwt = require("jsonwebtoken");
// const router = express.Router();

// const authenticateToken = (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!token) return res.sendStatus(401);
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// // Crear nota
// router.post("/", authenticateToken, async (req, res) => {
//   const note = new Note({ userId: req.user.id, ...req.body });
//   await note.save();
//   res.json(note);
// });

// // Obtener notas del usuario
// router.get("/", authenticateToken, async (req, res) => {
//   const notes = await Note.find({ userId: req.user.id });
//   res.json(notes);
// });

// // Actualizar nota
// router.put("/:id", authenticateToken, async (req, res) => {
//   const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(note);
// });

// // Eliminar nota
// router.delete("/:id", authenticateToken, async (req, res) => {
//   await Note.findByIdAndDelete(req.params.id);
//   res.json({ message: "Nota eliminada" });
// });

// module.exports = router;
