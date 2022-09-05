const express = require("express");

const {
  registrationControleer,
  loginControleer,
  logoutControleer,
  currentUserControleer,
  verifyEmailControleer,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const controllerWrapper = require("../middlewares/controllerWrapper");

const router = express.Router();

router.post("/registration", controllerWrapper(registrationControleer));
router.post("/login", controllerWrapper(loginControleer));
router.post("/logout", authMiddleware, controllerWrapper(logoutControleer));
router.post("/current", authMiddleware, controllerWrapper(currentUserControleer));

router.get("/verify/:verificationToken", controllerWrapper(verifyEmailControleer));

module.exports = { authRouter: router };
