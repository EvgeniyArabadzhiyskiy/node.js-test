const express = require("express");
// const multer = require("multer");
const path = require("path");
// const shortid = require("shortid");

const { filesController } = require("../controllers/filesController");
const controllerWrapper = require("../middlewares/controllerWrapper");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

const FILE_DIR = path.join(__dirname, "../../tmp/prod");

router.post("/upload", uploadMiddleware.single("avatar"), controllerWrapper(filesController));
router.use("/download", express.static(FILE_DIR));

module.exports = { filesRouter: router };