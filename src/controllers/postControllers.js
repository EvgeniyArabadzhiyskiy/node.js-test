const { Posts } = require("../db/postModel");

// const collections = require("../db/collections");
const {
  getPost,
  getPostById,
  addPost,
  deletePost,
  changePost,
} = require("../services/postService");

const getPostController = async (req, res) => {
  const { _id: userId } = req.user;
  const { limit = 20, page = 1 } = req.query;
  const skipPost = (page - 1) * limit;

  const posts = await getPost(userId, limit, skipPost);

  res.json({ posts, status: "success" });
};

const getPostByIdController = async (req, res) => {
  const { id: postId } = req.params;
  const { _id: userId } = req.user;
  const findPost = await getPostById(postId, userId);

  if (!findPost) {
    return res
      .status(400)
      .json({ message: `Post with  id=${req.params.id} Not Found` });
  }
  res.json(findPost);
};

const addPostController = async (req, res) => {
  const { body } = req;
  const { _id: userId } = req.user;
  const newPost = await addPost(userId, body);

  res.status(201).json({ newPost, status: "success" });
};

const deletePostController = async (req, res) => {
  const { id: postId } = req.params;
  const { _id: userId } = req.user;
  const removedPost = await deletePost(postId, userId);

  if (!removedPost) {
    return res
      .status(400)
      .json({ message: `Post with  id=${postId} Not Found` });
  }

  res.json({ removedPost, status: "success" });
};

const putPostController = async (req, res) => {
  const { id: postId } = req.params;
  const { topics, text } = req.body;
  const { _id: userId } = req.user;

  const updatePost = await changePost(postId, { topics, text }, userId);

  if (!updatePost) {
    return res
      .status(400)
      .json({ message: `Post with  id=${postId} Not Found` });
  }

  res.json({ updatePost, status: "success" });
};

module.exports = {
  getPostController,
  getPostByIdController,
  addPostController,
  putPostController,
  deletePostController,
};
