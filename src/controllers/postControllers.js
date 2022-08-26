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
  const posts = await getPost();

  res.json({ posts, status: "success" });
};

const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  const findPost = await getPostById(id);

  if (!findPost) {
    return res
      .status(400)
      .json({ message: `Post with  id=${req.params.id} Not Found` });
  }
  res.json(findPost);
};

const addPostController = async (req, res) => {
  const newPost = await addPost(req);

  res.status(201).json({ newPost, status: "success" });
};

const deletePostController = async (req, res) => {
  const { id } = req.params;
  const removedPost = await getPostById(id);
  await deletePost(id);

  if (!removedPost) {
    return res
      .status(400)
      .json({ message: `Post with  id=${req.params.id} Not Found` });
  }

  res.json({ removedPost, status: "success" });
};

const putPostController = async (req, res) => {
  const { id } = req.params;
  const { topics, text } = req.body;

  await changePost(id, { topics, text });
  const updatePost = await getPostById(id);

  if (!updatePost) {
    return res
      .status(400)
      .json({ message: `Post with  id=${req.params.id} Not Found` });
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
