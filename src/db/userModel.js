const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  //   email: {
  //     type: String,
  //     required: true,
  //   },

  password: {
    type: String,
    required: true,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = model("User", userSchema);

module.exports = {
  User,
};
