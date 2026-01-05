const categoryModel = require("../models/categoryModel");

const createCatCategory = async (req, res) => {
    try {
        
        const { title, imageUrl } = req.body
        
        // Validation
        if (!title) {
            return res.status(404).send({
                success: false,
                mmessage:"Please Provide Title or imageUrl "
            })
        }

        const newCategory = new categoryModel({ title, imageUrl })
        await newCategory.save()
        res.status(201).send({
            success: true,
            message: "Category Create Successfully",
            newCategory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Error In Create Category API"
        })
    }
};

module.exports = { createCatCategory };
