const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    fname: {type: String,trim:true, required: true },

    lname: {type: String, trim:true,required: true },

    title: { type: String, enum: ["Mr", "Mrs", "Miss"], required: true },

    email: {
      type: String,
      trim:true,
      required: true,
      unique: true,
      lowercase:true,
      match: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    },

    
    password: { type: String, trim:true,required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author_model", authorSchema)