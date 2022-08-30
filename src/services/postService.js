const { Posts } = require("../db/postModel");

const getPost = async ( userId, limit, skipPost ) => {

  return await Posts.find({ userId });

  // return await Posts.find({ userId })
  // .select({ __v: 0, userId: 0, createAt: 0 })
  // .skip(skipPost)
  // .limit(limit);

  // return await Posts.aggregate([
  //   { $match: { userId } },
  //   { $project: { __v: 0, createAt: 0 } },
  //   { $skip: Number(skipPost) },
  //   { $limit: Number(limit) },
  // ]);
};

const getPostById = async (postId, userId) => {
  const result = await Posts.findOne({ _id: postId, userId });
  return result
};

const addPost = async (userId, body) => {
  const post = new Posts({ ...body, userId });

  return await post.save();
};

const deletePost = async (postId, userId) => {

  return await Posts.findOneAndRemove({ _id: postId, userId });
};

const changePost = async (postId, { topics, text }, userId) => {
  const updatePost = await Posts.findOneAndUpdate(
    { _id: postId, userId },
    {  $set: { topics, text } },
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
