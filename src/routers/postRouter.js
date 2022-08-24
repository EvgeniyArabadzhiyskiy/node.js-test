const Joi = require("joi");
const express = require("express");

const {
  addPostValidation,
  putPostValidation,
} = require("../middlewares/validationMiddlewear");

const {
  getPost,
  getPostById,
  addPost,
  putPost,
  deletePost,
} = require("../controllers/postControllers");
const router = express.Router();

router.get("/", getPost);
router.get("/:id", getPostById);
router.post("/", addPostValidation, addPost);
router.put("/:id", putPostValidation, putPost);
router.delete("/:id", deletePost);

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