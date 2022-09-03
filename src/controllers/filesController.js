const fs = require("fs/promises");
const path = require("path");

const postDir = path.join(__dirname, "../../public", "post");

const filesController = async (req, res, next) => {

  if (!req.file) {
    next();
    return req.body
  }

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(postDir, filename);

  const imagePath = path.join("post", filename);

  try {
    await fs.rename(oldPath, newPath);

    req.body = {
      ...req.body,
      image: imagePath,
    };
  } catch (error) {
    await fs.unlink(oldPath);
  }

  next();
};

module.exports = {
  filesController,
};
