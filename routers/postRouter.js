const express = require("express");
const router = express.Router();

let posts = [
  { id: "1", topics: "text1", text: "test text1" },
  { id: "2", topics: "text2", text: "test text2" },
  { id: "3", topics: "text3", text: "test text3" },
];

// const words = [{name:'one'}, {name:'two'}, {name:'three'}, {name:'four'}]

// words.forEach((word,index) => {
//   console.log("words.forEach ~ word", word);
//   // word = {age:14}
//   // word.name = 'djon'

//   // console.log('words[index]',words[index]  );

//   //  words[index].name += '1500'
//   words[index] = {age:14}

// })
// console.log("words", words);

// let a = 'one'
// // let d = 'dj'
// const d =  a + 'dj'
// console.log("d", d );

router.get("/", (req, res) => {
  res.json({ posts, status: "success" });
});

router.get("/:id", (req, res) => {
  const findPost = posts.find((post) => post.id === req.params.id);
  console.log("router.get ~ findPost", findPost);

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

router.put("/:id", (req, res) => {
  const { topics, text } = req.body;

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.topics = topics;
      post.text = text;
    }
  });

  //========================================================================
  // const findPostInd = posts.findIndex((post) => post.id === req.params.id);

  // posts[findPostInd] = {
  //   ...posts[findPostInd],
  //   ...req.body,
  // };

  //========================================================================
  // posts.forEach((post, index) => {
  //   if (post.id === req.params.id) {
  //     posts[index] = {
  //       ...posts[index],
  //       ...req.body,
  //     };
  //   }
  // });

  res.json(posts);
  
});

router.delete("/:id", (req, res) => {
  posts = posts.filter((post) => post.id !== req.params.id);

  res.json(posts);
});

module.exports = { postRouter: router };
