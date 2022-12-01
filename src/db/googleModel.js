const { Schema, model } = require("mongoose");
// const bcrypt = require("bcrypt");

const googleSchema = Schema({
  name: {
    type: String,
    // required: true,
    // unique: true,
  },

    email: {
      type: String,
    //   required: true,
    },

  // password: {
  //   type: String,
  //   required: true,
  // },

  createAt: {
    type: Date,
    default: Date.now(),
  },

  token: {
    type: String,
    default: null,
  },
});



const Google = model("google", googleSchema);

module.exports = {
    Google,
};
