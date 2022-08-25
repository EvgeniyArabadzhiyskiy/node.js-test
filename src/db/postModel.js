const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
});

const Posts = mongoose.model("Post", postSchema);

module.exports = {
  Posts,
};
