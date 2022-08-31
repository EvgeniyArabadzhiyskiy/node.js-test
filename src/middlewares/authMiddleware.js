const jwt = require("jsonwebtoken");

const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return res.status(401).json({ message: "Not authorization" });
    // next( new Error("Not authorization" ))
  }

  try {
    const { _id } = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);

    if (!user || !user.token) {
      return res.status(401).json({ message: "Not authorization" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
