const express = require("express");

const {
  registrationControleer,
  loginControleer,
} = require("../controllers/authController");

const controllerWrapper = require("../middlewares/controllerWrapper");

const router = express.Router();

router.post("/registration", controllerWrapper(registrationControleer));
router.post("/login", controllerWrapper(loginControleer));

module.exports = { authRouter: router };
