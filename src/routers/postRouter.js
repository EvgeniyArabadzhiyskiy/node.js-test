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

const router = express.Router();

router.use(authMiddleware)

router.get("/", controllerWrapper(getPostController));
router.get("/:id", controllerWrapper(getPostByIdController));
router.post("/",  controllerWrapper(addPostController));
router.put("/:id", putPostValidation, controllerWrapper(putPostController));
router.delete("/:id", controllerWrapper(deletePostController));

module.exports = { postRouter: router };
// addPostValidation