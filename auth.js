import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and has Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token payload to req.user

    // Admin route protection
    if (req.originalUrl.startsWith("/api/admin") && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. Admins Only." });
    }

    next(); // Token valid, proceed to route
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
}
