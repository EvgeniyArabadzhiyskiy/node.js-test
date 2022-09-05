const { User } = require("../db/userModel");
const { registration, login, logout } = require("../services/authService");

const registrationControleer = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await registration(name, email, password);

  res.json({ user, status: "success",  });
};

const loginControleer = async (req, res) => {
  const { name, password } = req.body;

  const token = await login(name, password);

  res.json({ name, token, status: "success" });
};

const logoutControleer = async (req, res) => {
  const { _id } = req.user;

  await logout(_id);

  res.json({ status: "success" });
};

const currentUserControleer = async (req, res) => {
  const { _id } = req.user;

  const { name, createAt } = await User.findById(_id);

  res.json({ status: "success", name, createAt });
};

const verifyEmailControleer = async (req, res) => {
  const {verificationToken} = req.params
  
};

module.exports = {
  registrationControleer,
  loginControleer,
  logoutControleer,
  currentUserControleer,
  verifyEmailControleer,
};
