const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail')
require("dotenv").config();

const { User } = require("../db/userModel");

const registration = async (name, email, password) => {
  const user = new User({ name, email, password: await bcrypt.hash(password, 10)});

  //  Send message 
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: email, // Change to your recipient
    from: 'djon4292@gmail.com', // Change to your verified sender
    subject: 'Hello World',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<h1>and easy to do anywhere, even with Node.js</h1>',
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    console.log(error);
  }

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
