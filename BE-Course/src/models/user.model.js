const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    fullName: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true, unique: true },
    address: { type: String, require: true, unique: true },
    imageUrl: { type: String, default: null },
    gender: { type: Number, default: 0 },
    role: { type: Number, default: 2 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", schema);
