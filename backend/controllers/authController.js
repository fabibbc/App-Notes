// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Función para obtener los datos del usuario autenticado
const getUser = async (req, res) => {
  try {
    console.log("Fetching user by ID:", req.user);  // Log the userId from the request
    const user = await User.findById(req.user);
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: "User not found" });
    }
    console.log("User found:", user);  // Log the user data
    res.json(user);
  } catch (err) {
    console.log("Error fetching user:", err.message);  // Log any errors
    res.status(500).send("Server Error");
  }
};



// Registro de usuario
const register = async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password);

  try {
    // Verifica si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Crear nuevo usuario
    user = new User({ username, email, password });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generar token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Función de inicio de sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por su email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Crear y devolver el token JWT
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, getUser };
