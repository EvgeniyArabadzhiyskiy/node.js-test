const ObjectId = require("mongodb").ObjectId;

const collections = require("../db/collections");

const getPost = async (req, res) => {
  const posts = await collections.Posts.find({}).toArray();

  console.log("getPost ~ posts", posts);
  res.json({ posts, status: "success" });
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const findPost = await collections.Posts.findOne({ _id: ObjectId(id) });

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

  await collections.Posts.insertOne({ ...req.body });

  res.status(201).json({ newPost, status: "success" });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletePost = await collections.Posts.findOne({ _id: ObjectId(id) });
  await collections.Posts.deleteOne({ _id: ObjectId(id) });

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

  await collctions.Posts.updateOne(
    { _id: ObjectId(id) },
    { $set: { topics, text } }
  );
  const updatePost = await collections.Posts.findOne({ _id: ObjectId(id) });

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
