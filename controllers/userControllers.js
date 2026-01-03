const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const userController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    // Find User
    const user = await userModel.findById({ _id: req.body.id });

    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update user API",
      error,
    });
  }
};

const updateUserPasswordController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalide old password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
        req: req.body,
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found or Invlaid answer",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Reset Password Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "",
      error,
    });
  }
};

const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Profile API",
      error,
    });
  }
};

module.exports = {
  userController,
  updateUserController,
  updateUserPasswordController,
  resetPasswordController,
  deleteProfileController,
};
