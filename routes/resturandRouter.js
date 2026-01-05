const express = require("express")
const authMiddlewere = require("../middlewares/authMidllewar")
const { createResturantController } = require("../controllers/resturantController")
const router = express.Router()

// routes
router.post('/create', authMiddlewere, createResturantController)

module.exports = router