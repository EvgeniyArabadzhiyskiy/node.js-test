const express = require("express");

const {
  registrationControleer,
  loginControleer,
  logoutControleer,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const controllerWrapper = require("../middlewares/controllerWrapper");

const router = express.Router();

router.post("/registration", controllerWrapper(registrationControleer));
router.post("/login", controllerWrapper(loginControleer));
router.post("/logout", authMiddleware, controllerWrapper(logoutControleer));

module.exports = { authRouter: router };
