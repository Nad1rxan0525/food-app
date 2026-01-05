const mongoose = require("mongoose");

// Schema
const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required :[true, "categoy title is required"]
        },
        imageUrl: {
            type: String,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAgchac_pWDNqqifYwO1DiaxmcEkAIUxdDPQ&s",
        }
  },
  {
    timestamps: true,
  }
);

// export
module.exports = mongoose.model("Category", categorySchema);
