const { Schema, model } = require("mongoose");

const postSchema = Schema({
  topics: {
    type: String,
    required: true,
    unique: true,
  },

  text: {
    type: String,
    required: true,
    unique: true,
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
