const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

const FILE_DIR = path.join(__dirname, "../../tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_DIR);
  },

  filename: function (req, file, cb) {
    const [_, expresion] = file.originalname.split(".");
    cb(null, `${shortid()}.${expresion}`);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
