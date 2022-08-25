const Joi = require("joi");
const express = require("express");

const {
  addPostValidation,
  putPostValidation,
} = require("../middlewares/validationMiddlewear");

const {
  getPost,
  getPostById,
  addPost,
  putPost,
  deletePost,
} = require("../controllers/postControllers");

const controllerWrapper = require("../middlewares/controllerWrapper");

const router = express.Router();

router.get("/", controllerWrapper(getPost));
router.get("/:id", controllerWrapper(getPostById));
router.post("/", addPostValidation, controllerWrapper(addPost));
router.put("/:id", putPostValidation, controllerWrapper(putPost));
router.delete("/:id", controllerWrapper(deletePost));

module.exports = { postRouter: router };
