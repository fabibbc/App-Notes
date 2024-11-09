// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    console.log("No token, authorization denied");  // Log the error
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);  // Log the decoded token to check if userId is correct
    req.user = decoded.userId;  // Store userId in request
    next();
  } catch (error) {
    console.log("Token is not valid:", error.message);  // Log the error message for token verification
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
