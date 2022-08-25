const ObjectId = require("mongodb").ObjectId;
const { Posts } = require("../db/postModel");

const collections = require("../db/collections");

const getPost = async (req, res) => {
  const posts = await Posts.find({});

  console.log("getPost ~ posts", posts);
  res.json({ posts, status: "success" });
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const findPost = await Posts.findById(id);

  if (!findPost) {
    return res
      .status(400)
      .json({ message: `Post with  id=${req.params.id} Not Found` });
  }
  res.json(findPost);
};

const addPost = async (req, res) => {
  const newPost = {
    ...req.body,
  };

  // const { topics, text } = req.body;

  const post = new Posts({ ...req.body });
  await post.save();
  // await Posts.create({ text, topics });

  res.status(201).json({ newPost, status: "success" });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletePost = await Posts.findById(id);
  await Posts.findByIdAndRemove(id);

  if (!deletePost) {
    return res
      .status(400)
      .json({ message: `Post with  id=${req.params.id} Not Found` });
  }

  res.json({ deletePost, status: "success" });
};

const putPost = async (req, res) => {
  const { topics, text } = req.body;
  const { id } = req.params;

  await Posts.findByIdAndUpdate(id, { $set: { topics, text } });
  const updatePost = await Posts.findById(id);

  if (!updatePost) {
    return res
      .status(400)
      .json({ message: `Post with  id=${req.params.id} Not Found` });
  }

  res.json({ updatePost, status: "success" });
};

module.exports = {
  getPost,
  getPostById,
  addPost,
  putPost,
  deletePost,
};
