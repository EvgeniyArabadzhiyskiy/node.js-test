const { Posts } = require("../db/postModel");

const getPost = async () => {
  return await Posts.find({});
};

const getPostById = async (id) => {
  return await Posts.findById(id);
};

const addPost = async (req) => {
  // const { topics, text } = req.body;
  // const newPost = await Posts.create({ text, topics });

  const post = new Posts({ ...req.body });
  return await post.save();
};

const deletePost = async (id) => {
  await Posts.findByIdAndRemove(id);
};

const changePost = async (id, { topics, text }) => {
  await Posts.findByIdAndUpdate(id, { $set: { topics, text } });
};

module.exports = {
  getPost,
  getPostById,
  addPost,
  deletePost,
  changePost,
};
