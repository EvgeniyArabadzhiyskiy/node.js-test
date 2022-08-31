const express = require("express");

const {
  registrationControleer,
  loginControleer,
  logoutControleer,
  currentUserControleer,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const controllerWrapper = require("../middlewares/controllerWrapper");

const router = express.Router();

router.post("/registration", controllerWrapper(registrationControleer));
router.post("/login", controllerWrapper(loginControleer));
router.post("/logout", authMiddleware, controllerWrapper(logoutControleer));
router.post("/current", authMiddleware, controllerWrapper(currentUserControleer));

module.exports = { authRouter: router };
