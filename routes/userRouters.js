const express = require("express");
const { userController, updateUserController , updateUserPasswordController} = require("../controllers/userControllers");
const authMiddlewere = require("../Middlewares/authMidllewar")
const router = express.Router();

router.get("/getUser", authMiddlewere, userController);

router.patch("/updateUser", authMiddlewere, updateUserController)

router.patch("/updateUserPassword", authMiddlewere, updateUserPasswordController )

module.exports = router;
