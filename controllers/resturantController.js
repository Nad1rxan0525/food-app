const resturantModel = require("../models/resturandModel");

const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imgeUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    //  Validation

    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Title or address",
      });
    }

    const newResturnt = new resturantModel({
      title,
      imgeUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    newResturnt.save();
    res.status(201).send({
      success: true,
      message: "New Resturant Created  Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Resturant App",
      error,
    });
  }
};

const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      res.status(404).send({
        success: true,
        message: "No Resturant Availible",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Restaurant API",
      error,
    });
  }
};

const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    console.log(req.params.id);

    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturant ID",
      });
    }

    const resturant = await resturantModel.findById({ _id: resturantId });

    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Not Fount Resturant",
      });
    }

    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Resturant By Id API",
      error,
    });
  }
};

const deleteResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;

    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Not Fount Delete Resturant By ID",
      });
    }

    await resturantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Delete Resturant By ID Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Delete Resturant By ID API",
      error,
    });
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantByIdController,
};
