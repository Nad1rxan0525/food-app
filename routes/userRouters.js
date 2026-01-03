const express = require("express");

const {
  userController,
  updateUserController,
  updateUserPasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controllers/userControllers");

const authMiddlewere = require("../middlewares/authMidllewar");
const router = express.Router();

router.get("/getUser", authMiddlewere, userController);

router.patch("/updateUser", authMiddlewere, updateUserController);

router.patch(
  "/updateUserPassword",
  authMiddlewere,
  updateUserPasswordController
);

router.patch("/resetPassword", authMiddlewere, resetPasswordController);

router.delete("/deleteUser/:id", authMiddlewere, deleteProfileController);

module.exports = router;
