import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: "Not logged in." });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return res.status(403).json({ error: "Invalid token" });
    }

    // Find user in DB to attach full info if needed
    const user = await User.findById(decoded.id).select("-password -salt");
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(403).json({ error: "Unauthorized" });
  }
};

