const { Posts } = require("../db/postModel");

const getPost = async (owner, limit, skipPost) => {
  return await Posts.find({ owner }).populate("owner", {__v: 0, password: 0, token: 0});

  // return await Posts.find({ owner })
  // .select({ __v: 0, owner: 0, createAt: 0 })
  // .skip(skipPost)
  // .limit(limit);

  // return await Posts.aggregate([
  //   { $match: { owner } },
  //   { $project: { __v: 0, createAt: 0 } },
  //   { $skip: Number(skipPost) },
  //   { $limit: Number(limit) },
  // ]);
};

const getPostById = async (postId, owner) => {
  const result = await Posts.findOne({ _id: postId, owner });
  return result;
};

const addPost = async (owner, body) => {
  const post = new Posts({ ...body, owner });

  return await post.save();
};

const deletePost = async (postId, owner) => {
  return await Posts.findOneAndRemove({ _id: postId, owner });
};

const changePost = async (postId, { topics, text }, owner) => {
  const updatePost = await Posts.findOneAndUpdate(
    { _id: postId, owner },
    { $set: { topics, text } },
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
