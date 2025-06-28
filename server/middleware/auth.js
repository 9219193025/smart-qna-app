// middleware/auth.js
// server/middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // ← lowercase 'authorization'

  if (!authHeader) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[0].startsWith("ey") 
    ? authHeader 
    : authHeader.split(" ")[1]; 
     token = authHeader.split(" ")[1];// Support both 'Bearer <token>' and raw token

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
