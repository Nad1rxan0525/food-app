const categoryModel = require("../models/categoryModel");

const createCatCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    // Validation
    if (!title) {
      return res.status(404).send({
        success: false,
        mmessage: "Please Provide Title or imageUrl ",
      });
    }

    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category Create Successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Category API",
    });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const categorys = await categoryModel.find({});
    // validation
    if (!categorys) {
      return res.status(404).send({
        success: false,
        message: "Not Found Categorys",
      });
    }

    res.status(200).send({
      success: true,
      totaleCategorys: categorys.length,
      categorys,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Category API ",
      error,
    });
  }
};

const updateCatControllere = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    // Validation ID
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category = await categoryModel.findById({ _id: id });
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Not Found Category Cat",
      });
    }

    if (title !== undefined) category.title = title;
    if (imageUrl !== undefined) category.imageUrl = imageUrl;

    await category.save();

    res.status(200).send({
      success: true,
      message: "Update Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Upate Category API",
      error,
    });
  }
};

const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update cat api",
      error,
    });
  }
};

module.exports = {
  createCatCategory,
  getAllCategoryController,
  updateCatControllere,
};
