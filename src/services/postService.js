const { Posts } = require("../db/postModel");

const getPost = async ({userId, limit, skipPost}) => {
  return await Posts.find({ userId }).skip(skipPost).limit(limit);
};

const getPostById = async (postId, userId) => {
  return await Posts.findOne({ _id: postId, userId });
};

const addPost = async (userId, body) => {
  // const { topics, text } = req.body;
  // const newPost = await Posts.create({ text, topics });

  const post = new Posts({ ...body, userId });
  return await post.save();
};

const deletePost = async (postId, userId) => {
  return await Posts.findOneAndRemove({ _id: postId, userId });
};

const changePost = async (postId, { topics, text }, userId) => {
  const updatePost = await Posts.findOneAndUpdate(
    { _id: postId, userId },
    {
      $set: { topics, text },
    },
    { new: true }
  );

  return updatePost;
};

module.exports = {
  getPost,
  getPostById,
  addPost,
  deletePost,
  changePost,
};
