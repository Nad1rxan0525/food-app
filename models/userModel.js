const mongoose = require("mongoose");

// schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is require"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg",
    },
    answer: {
      type: String,
      require:[true, "Asnwer is required"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
