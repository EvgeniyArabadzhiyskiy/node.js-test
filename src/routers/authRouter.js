const express = require("express");

const {
  registrationControleer,
  loginControleer,
  logoutControleer,
  currentUserControleer,
  verifyEmailControleer,
  updateAvatarController,
  repeatVerifyControleer,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const controllerWrapper = require("../middlewares/controllerWrapper");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/registration", controllerWrapper(registrationControleer));
router.post("/login", controllerWrapper(loginControleer));
router.post("/logout", authMiddleware, controllerWrapper(logoutControleer));
router.post("/current", authMiddleware, controllerWrapper(currentUserControleer));
router.patch("/avatar", authMiddleware, uploadMiddleware.single('avatar'), controllerWrapper(updateAvatarController));

router.get("/verify/:verificationToken", controllerWrapper(verifyEmailControleer));
router.post("/repeat/verify", controllerWrapper(repeatVerifyControleer));

module.exports = { authRouter: router };
