let posts = [
  { id: "1", topics: "text1", text: "test text1" },
  { id: "2", topics: "text2", text: "test text2" },
  { id: "3", topics: "text3", text: "test text3" },
];

const getPost = (req, res) => {
  res.json({ posts, status: "success" });
};

const getPostById = (req, res) => {
  const [findPost] = posts.filter((post) => post.id === req.params.id);

  if (!findPost) {
    return res.json({ message: `Post with  id=${req.params.id} Not Found` });
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

  //======================================================================
  // posts.forEach((post, index) => {
  //   if (post.id === req.params.id) {
  //     posts[index] = {
  //       ...posts[index],
  //       ...req.body,
  //     };
  //   }
  // });
};

module.exports = {
  getPost,
  getPostById,
  addPost,
  putPost,
  deletePost,
};
