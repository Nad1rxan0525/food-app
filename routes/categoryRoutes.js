const express = require("express")
const authMiddlewere = require("../middlewares/authMidllewar")
const { createCatCategory } = require("../controllers/categoryController")

const router = express.Router()


router.post("/create", authMiddlewere, createCatCategory)

module.exports = router