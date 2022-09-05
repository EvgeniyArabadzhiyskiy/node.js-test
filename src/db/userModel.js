const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
  },

  avatarUrl: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },

  token: {
    type: String,
    default: null,
  },

  verify: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

// userSchema.pre("save", async function () {
//   if (this.isNew) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
// });

// userSchema.methods.setPassword = function (password) {
//   this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

const User = model("user", userSchema);

module.exports = {
  User,
};
