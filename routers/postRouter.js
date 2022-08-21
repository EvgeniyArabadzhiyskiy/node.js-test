const Joi = require("joi");
const express = require("express");
const router = express.Router();

let posts = [
  { id: "1", topics: "text1", text: "test text1" },
  { id: "2", topics: "text2", text: "test text2" },
  { id: "3", topics: "text3", text: "test text3" },
];
console.log("posts", posts);

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
  const schema = Joi.object({
    topics: Joi.string().alphanum().min(3).max(30).required(),
    text: Joi.string().alphanum().min(3).max(30).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newPost = {
    id: Date.now().toString(),
    ...req.body,
  };

  posts.push(newPost);
  console.log("router.post ~ posts", posts);

  res.json({ newPost, status: "success" });
});

router.put("/:id", (req, res) => {
  const { topics, text } = req.body;

  const schema = Joi.object({
    topics: Joi.string().alphanum().min(3).max(30).required(),
    text: Joi.string().alphanum().min(3).max(30).required(),
  });

  const {error} = schema.validate(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.topics = topics;
      post.text = text;
    }
    
  });

  // res.json(posts);

  //========================================================================
  const findPostInd = posts.findIndex((post) => post.id === req.params.id);
  console.log("router.put ~ findPostInd", posts[findPostInd]);

  posts[findPostInd] = {
    ...posts[findPostInd],
    ...req.body,
  };
  console.log("router.put ~ findPostInd", posts[findPostInd]);

  res.json(posts[findPostInd]);
  
  //========================================================================
  // posts.forEach((post, index) => {
  //   if (post.id === req.params.id) {
  //     posts[index] = {
  //       ...posts[index],
  //       ...req.body,
  //     };
  //   }
  // });

  
});

router.delete("/:id", (req, res) => {
  posts = posts.filter((post) => post.id !== req.params.id);

  res.json(posts);
});

module.exports = { postRouter: router };
//=======================================================================================================
// const words = [{tag:{name:'one'}}, {tag:{name:'two'}}, {tag:{name:'three'}}, {tag:{name:'four'}}]

// const words = {
//   tag: { name: "one" },
// };

// const words = {
//    name: "one" ,
// };
// let words = 20

// let copy = words
// let copy = { ...words };
// words = 14
// copy = {tag:{push:'poly'}}

// copy = {tag:{push:'poly'}}
// const newObject = {tag:{name:'poly'}}
// copy = newObject

// copy = {tag:{name:'poly'}}
// copy = 14
// copy.tag.name = {tag: 'poly'}

// copy.tag.name = "mango";
// copy.name = "mango";
// console.log("copy", copy);

// console.log(copy === words);
// console.log( copy.tag === words.tag);
// console.log( copy.tag.name === words.tag.name);


//=======================================================================================================
// words.forEach((word,index) => {
//   // console.log("words.forEach ~ word", word.tag.name === words[0].tag.name);
//   // word = {age:14}
//   // word.name = 'djon'

//   word.tag = 'djon'

//   // console.log('words[index]',words[index]  );

//   //  words[index].tag += '1500'
//   // words[index] = {age:14}

// })

// console.log("words", words);


//=======================================================================================================
// const array = [ 2,4,8,10,15,28,47]
// const array = [{tag:{name:'one'}}, {tag:{name:'two'}}, {tag:{name:'three'}}, {tag:{name:'four'}}]


// let copyArray = array
// let copyArray = [...array]
// console.log("copyArray", copyArray === array);
// console.log("copyArray", copyArray[0] === array[0]);

// array[0] = 'mango'
// copyArray[0] = 'djon'

// copyArray[1].tag = 'poly'
// console.log("copyArray tag    >>>", copyArray[0].tag = 'djon');
// console.log("array tag   >>>", array[0].tag);

// copyArray[0] = 400
// array[0] = 2000


// console.log("array", array);
// console.log("copyArray", copyArray);




