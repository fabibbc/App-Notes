// backend/routes/auth.js
const express = require("express");
const { register, login, getUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware"); // Import auth middleware

const router = express.Router();

// Ruta de registro
router.post("/register", register);
router.post("/login", login);  // Nueva ruta para iniciar sesión

// Ruta para obtener los datos del usuario actual (con token)
router.get("/", authMiddleware, getUser); // Add this line for the GET /api/auth route

module.exports = router;


