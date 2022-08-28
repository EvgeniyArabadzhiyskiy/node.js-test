const bcrypt = require("bcrypt");

const { User } = require("../db/userModel");

const registration = async (name, password) => {
  const user = new User({ name, password: await bcrypt.hash(password, 10) });
  return await user.save();
};

const login = (name, password) => {
  // console.log("hello");
};

module.exports = {
  registration,
  login,
};
