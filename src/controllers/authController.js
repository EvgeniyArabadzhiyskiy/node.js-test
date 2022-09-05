const path = require("path");
const fs = require("fs/promises");
const shortid = require("shortid");

const { User } = require("../db/userModel");
const { registration, login, logout, repeatVerify, verifyEmail } = require("../services/authService");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const registrationControleer = async (req, res) => {
  const { name, email, password } = req.body;
  const verificationToken = shortid()

  const user = await registration(name, email, password, verificationToken);

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

  const { name, createAt, avatarUrl } = await User.findById(_id);

  res.json({ status: "success", name, createAt, avatarUrl });
};


const updateAvatarController = async (req, res) => {
  const {_id} = req.user
  const { path: originalPath, filename } = req.file;
  const endPath = path.join(avatarDir, filename); 

  const avatarUrl = path.join( "avatars", filename);

  try {
    await fs.rename(originalPath, endPath);
    await User.findByIdAndUpdate(_id, { avatarUrl })

    res.json({avatarUrl})
  } catch (error) {
    await fs.unlink(originalPath)
  }
};

const verifyEmailControleer = async (req, resp) => {
  const {verificationToken} = req.params

  const ddd = await verifyEmail(verificationToken)
  console.log("verifyEmailControleer ~ ddd", ddd);

  resp.json({ message: `Verification successful`});
  
};

const repeatVerifyControleer = async (req, res) => {
  const { email } = req.body

  await repeatVerify(email)

  res.json({ message: `Verification message send to email ${email}`});
};

module.exports = {
  registrationControleer,
  loginControleer,
  logoutControleer,
  currentUserControleer,
  updateAvatarController,
  verifyEmailControleer,
  repeatVerifyControleer
};
