const { registration, login } = require("../services/authService");

const registrationControleer = async (req, res) => {
  const { name, password } = req.body;

  const user = await registration(name, password);
  // console.log("registrationControleer ~ user", user);

  res.json({ message: "success" });
};

const loginControleer = async (req, res) => {
  await login();
};

module.exports = {
  registrationControleer,
  loginControleer,
};
