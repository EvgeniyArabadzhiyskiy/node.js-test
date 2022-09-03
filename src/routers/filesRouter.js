const express = require("express");
// const multer = require("multer");
const path = require("path");
// const shortid = require("shortid");

const { filesController } = require("../controllers/filesController");
const controllerWrapper = require("../middlewares/controllerWrapper");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

const FILE_DIR = path.join(__dirname, "../../tmp/prod");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, FILE_DIR);
//   },

//   filename: function (req, file, cb) {
//     const [_, expresion] = file.originalname.split(".");
//     cb(null, `${shortid()}.${expresion}`);
//     // cb(null, file.originalname);
//   },
// });

// const uploadMiddleware = multer({ storage });

router.post("/upload", uploadMiddleware.single("avatar"), controllerWrapper(filesController));
router.use("/download", express.static(FILE_DIR));

module.exports = { filesRouter: router };
