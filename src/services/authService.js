const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../db/userModel");

const registration = async (name, password) => {
  const user = new User({ name, password: await bcrypt.hash(password, 10) });
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

  const token = jwt.sign(
    {
      _id: user._id,
      createAt: user.createAt,
    },
    process.env.JWT_SECRET
  );

  return token;
};

module.exports = {
  registration,
  login,
};
