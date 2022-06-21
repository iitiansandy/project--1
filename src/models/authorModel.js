const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    fname: {type: String, require: true },

    lname: {type: String, require: true },

    title: { type: String, enum: ["Mr", "Mrs", "Miss"], require: true },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
    //   validate: [validateEmail, "Please fill a valid email address"],
    //   match: [
    //     /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
    //     "Please fill a valid email address",
    //   ],
    },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author_model", authorSchema)