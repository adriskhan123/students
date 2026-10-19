import jwt from "jsonwebtoken";

// Must be the same secret used in user.routes.js
const JWT_SECRET = "123";

// Reads the "stc-operator" cookie, verifies it and sets req.user = { id, role }
export default function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.["stc-operator"];

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Not logged in",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Invalid or expired token",
    });
  }
}