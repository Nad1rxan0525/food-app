const express = require("express")
const authMiddlewere = require("../middlewares/authMidllewar")
const { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantByIdController } = require("../controllers/resturantController")
const router = express.Router()

// routes
router.post('/create', authMiddlewere, createResturantController)

router.get("/getAll", getAllResturantController )

router.get("/get/:id", getResturantByIdController)

router.delete('/delete/:id', authMiddlewere , deleteResturantByIdController)

module.exports = router