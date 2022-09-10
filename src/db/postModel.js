const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongoose").Types;

const postSchema = Schema({
  topics: {
    type: String,
    required: true,
    // unique: true,
  },

  text: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  owner: {
    type: ObjectId,
    ref: "user",
    required: true,
    // select: false,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },

  // name: {
  //   type: String,
  //   required: [true, "Set name for contact"],
  // },
  // email: {
  //   type: String,
  // },
  // phone: {
  //   type: String,
  // },
  // favorite: {
  //   type: Boolean,
  //   default: false,
  // },
});

const Posts = model("Posts", postSchema);

module.exports = {
  Posts,
};
