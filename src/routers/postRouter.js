const Joi = require("joi");
const express = require("express");

const {
  addPostValidation,
  putPostValidation,
} = require("../middlewares/validationMiddlewear");

const {
  getPostController,
  getPostByIdController,
  addPostController,
  putPostController,
  deletePostController,
} = require("../controllers/postControllers");

const controllerWrapper = require("../middlewares/controllerWrapper");
const authMiddleware = require("../middlewares/authMiddleware");


const uploadMiddleware = require("../middlewares/uploadMiddleware");
const { filesController } = require("../controllers/filesController");

const router = express.Router();

router.use(authMiddleware)

router.get("/", controllerWrapper(getPostController));
router.get("/:id", controllerWrapper(getPostByIdController));
router.post("/", uploadMiddleware.single("avatar"), controllerWrapper(filesController), controllerWrapper(addPostController));
router.post("/upload", uploadMiddleware.single("avatar"), controllerWrapper(filesController));
router.put("/:id", putPostValidation, controllerWrapper(putPostController));
router.delete("/:id", controllerWrapper(deletePostController));

module.exports = { postRouter: router };
// addPostValidation
