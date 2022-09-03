const express = require("express");

const {
  registrationControleer,
  loginControleer,
  logoutControleer,
  currentUserControleer,
  updateAvatarController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const controllerWrapper = require("../middlewares/controllerWrapper");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/registration", controllerWrapper(registrationControleer));
router.post("/login", controllerWrapper(loginControleer));
router.post("/logout", authMiddleware, controllerWrapper(logoutControleer));
router.get("/current", authMiddleware, controllerWrapper(currentUserControleer));
router.patch("/avatar", authMiddleware, uploadMiddleware.single('avatar'), controllerWrapper(updateAvatarController));

module.exports = { authRouter: router };
