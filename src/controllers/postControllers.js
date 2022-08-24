// const { Posts } = require("../db/collections");

const collections = require("../db/collections");

// let posts = [
//   { id: "1", topics: "text1", text: "test text1" },
//   { id: "2", topics: "text2", text: "test text2" },
//   { id: "3", topics: "text3", text: "test text3" },
// ];

// const contacts = await collection.find({}).toArray();
// console.log("main ~ contacts", contacts);

// const getPost = async (req, res) => {
//   const posts = await Posts.find({}).toArray();

//   res.json({ posts, status: "success" });
// };


const getPost = async (req, res) => {
  // const posts = await Posts.find({}).toArray();
  const posts = await collections.Posts.find({}).toArray();

  console.log("getPost ~ posts", posts);
  res.json({ posts, status: "success" });
};
// getPost()

const getPostById = (req, res) => {
  const [findPost] = posts.filter((post) => post.id === req.params.id);

  if (!findPost) {
    return res
      .status(400)
      .json({ message: `Post with  id=${req.params.id} Not Found` });

    // const error = new Error(`Post with  id=${req.params.id} Not Found`)
    // error.status = 400
    // throw error
  }
  res.json(findPost);
};

const addPost = (req, res) => {
  const newPost = {
    id: Date.now().toString(),
    ...req.body,
  };

  posts.push(newPost);

  res.json({ newPost, status: "success" });
};

const deletePost = (req, res) => {
  posts = posts.filter((post) => post.id !== req.params.id);

  res.json(posts);
};

const putPost = (req, res) => {
  const { topics, text } = req.body;

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.topics = topics;
      post.text = text;
    }
  });

  // res.json(posts);

  //========================================================================
  const findPostInd = posts.findIndex((post) => post.id === req.params.id);

  posts[findPostInd] = {
    ...posts[findPostInd],
    ...req.body,
  };

  res.json(posts[findPostInd]);
};

module.exports = {
  getPost,
  getPostById,
  addPost,
  putPost,
  deletePost,
};
