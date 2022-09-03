const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { User } = require("../db/userModel");

const registration = async (name, password) => {
  const avatarUrl = gravatar.url(name)
  const user = new User({ name, avatarUrl, password: await bcrypt.hash(password, 10) });
  return await user.save();

  // const newUser = new User({ name });
  // newUser.setPassword(password);
  // newUser.save();
};

const login = async (name, password) => {
  const user = await User.findOne({ name });

  if (!user) {
    throw new Error(`User with name ${name} not found`);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Wrong Password");
  }

  const payload = {
    _id: user._id,
    createAt: user.createAt,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  await User.findByIdAndUpdate(user._id, { token });

  return token;
};

const logout = async (_id) => {
  await User.findByIdAndUpdate(_id, { token: null }, { new: true });
};

module.exports = {
  registration,
  login,
  logout,
};
