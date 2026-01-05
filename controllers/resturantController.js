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
        message:"New Resturant Created  Successfully"
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

module.exports = { createResturantController };
