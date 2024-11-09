// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const cors = require("cors"); // Import the cors package

dotenv.config();

// Conecta a la base de datos
connectDB(); 

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Use CORS middleware to allow requests from all origins (or specify a particular one)
app.use(cors());

// // Rutas
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes); // Rutas de notas protegidas

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  