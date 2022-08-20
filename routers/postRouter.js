const express = require("express");
const router = express.Router();

const posts = [
  { id: "1", topics: "text1", text: "test text1" },
  { id: "2", topics: "text2", text: "test text2" },
  { id: "3", topics: "text3", text: "test text3" },
];

router.get("/", (req, res) => {
  res.json({ posts, status: "success" });
});

router.get("/:id", (req, res) => {
  const [findPost] = posts.filter((post) => post.id === req.params.id);

  if (!findPost) {
    return res.json({ message: `Post with  id=${req.params.id} Not Found` });
  }

  res.json(findPost);
});

router.post("/", (req, res) => {
  const newPost = {
    id: Date.now(),
    ...req.body,
  };

  posts.push(newPost);

  res.json({ newPost, status: "success" });
});

router.delete("/:id", (req, res) => {
  const findPostInd = posts.findIndex((post) => post.id === req.params.id);

  if (findPostInd === -1) {
    return res.json({ message: `Post with  id=${req.params.id} Not Found` });
  }

  posts.splice(findPostInd, 1);

  res.json(posts);
});

module.exports = { postRouter: router };
