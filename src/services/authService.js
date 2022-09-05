const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const sgMail = require('@sendgrid/mail')
require("dotenv").config();

const { User } = require("../db/userModel");

const registration = async (name, email, password, verificationToken) => {
  const avatarUrl = gravatar.url(email)
  const user = new User({ name, email, avatarUrl, verificationToken, password: await bcrypt.hash(password, 10)});

  //  Send message 
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: email, // Change to your recipient
    from: 'djon4292@gmail.com', // Change to your verified sender
    subject: 'Hello World',
    text: `http://localhost:8085/api/auth/verify/${verificationToken}`,
    html: `<h1>http://localhost:8085/api/auth/verify/${verificationToken}</h1>`,
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
  // console.log("login ~ user", user.verify);

  if (!user.verify) {
    throw new Error(`User with email ${user.email} not verification `);
  }

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

const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({verificationToken})
  
  if (!user) {
    throw new Error(`User not found`); 
  }

  const result = await User.findByIdAndUpdate(
    user._id, 
    { verify: true, verificationToken: null }, 
    { new: true }
    )
};

const repeatVerify = async (email) => {
  if (!email) {
    throw new Error(`Missing required field email`); 
  }

  const {verificationToken} = await User.findOne({email})

  if (!verificationToken) {
    throw new Error(`Verification has already been passed`); 
  }

   //  Send message 
   sgMail.setApiKey(process.env.SENDGRID_API_KEY)

   const msg = {
     to: email, // Change to your recipient
     from: 'djon4292@gmail.com', // Change to your verified sender
     subject: 'Hello World',
     text: `http://localhost:8085/api/auth/verify/${verificationToken}`,
     html: `<h1>http://localhost:8085/api/auth/verify/${verificationToken}</h1>`,
   }
 
   try {
     await sgMail.send(msg)
   } catch (error) {
     console.log(error);
   }
};

module.exports = {
  registration,
  login,
  logout,
  verifyEmail,
  repeatVerify
};
