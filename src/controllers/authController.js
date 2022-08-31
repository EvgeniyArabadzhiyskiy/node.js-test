const { User } = require("../db/userModel");
const { registration, login } = require("../services/authService");

const registrationControleer = async (req, res) => {
  const { name, password } = req.body;

  const user = await registration(name, password);

  res.json({ message: "success" });
};

const loginControleer = async (req, res) => {
  const { name, password } = req.body;

  const token = await login(name, password);

  res.json({ name, token, status: "success" });
};

const logoutControleer = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, { token: null }, { new: true });

  res.json({ status: "success" });
};

module.exports = {
  registrationControleer,
  loginControleer,
  logoutControleer,
};
