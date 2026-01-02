const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");


const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;

    //   Validation
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    //   Check User
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registerd Please Login",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    // Create New User
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer
    });
    
    res.status(201).send({
      success: true,
      message: "Successfully Registerd",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide email or password",
      });
    }

    // Check User email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // Enter Password
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Wrong Password !!!",
      });
    }

    // TOKEN
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

module.exports = { registerController, loginController };
