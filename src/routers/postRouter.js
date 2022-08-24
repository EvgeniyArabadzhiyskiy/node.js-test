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
const router = express.Router();

router.get("/", getPost);
router.get("/:id", getPostById);
router.post("/", addPostValidation, addPost);
router.put("/:id", putPostValidation, putPost);
router.delete("/:id", deletePost);

module.exports = { postRouter: router };
