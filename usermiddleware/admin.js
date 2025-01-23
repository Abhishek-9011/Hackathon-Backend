const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the "Authorization" header

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decode and verify the token
    if (decodedToken.role !== "admin") { // Check if the user has the "admin" role
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = decodedToken; // Attach the decoded token to the request object
    next(); // Pass control to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = adminMiddleware;
