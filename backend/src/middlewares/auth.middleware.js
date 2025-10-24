import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res.status(401).json({ error: "Not logged in." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id)
      return res.status(403).json({ error: "Invalid token." });

    const user = await User.findById(decoded.id).select("-password -salt");
    if (!user)
      return res.status(401).json({ error: "User not found." });

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    if (error.name === "TokenExpiredError")
      return res.status(401).json({ error: "Session expired. Please log in again." });

    res.status(403).json({ error: "Unauthorized." });
  }
};

