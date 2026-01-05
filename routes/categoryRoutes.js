const express = require("express")
const authMiddlewere = require("../middlewares/authMidllewar")
const { createCatCategory, getAllCategoryController, updateCatControllere,  } = require("../controllers/categoryController")

const router = express.Router()


router.post("/create", authMiddlewere, createCatCategory)

router.get("/getAll", getAllCategoryController)

router.patch("/update/:id", authMiddlewere, updateCatControllere);

module.exports = router