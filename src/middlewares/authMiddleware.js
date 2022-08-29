const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const headerAuth = req.headers.authorization;

  if (!headerAuth) {
    return res.status(401).json({ message: "Please provide a token" });
    // next( new Error("Please provide a token" ))
  }
  const [tokenType, token] = req.headers.authorization.split(" ");

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
