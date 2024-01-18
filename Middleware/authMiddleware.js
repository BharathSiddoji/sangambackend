const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: "No Authorization header provided" });
  }

  const token = authHeader.split(' ')[1]; // The format of the header is "Bearer <token>"
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    if(!payload) throw new Error("Invalid token");
    req.user = payload;
    next();
  } catch (error) {
    console.log(error)
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = isAuthenticated;
