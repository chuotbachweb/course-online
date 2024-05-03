const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    nameCourse: { type: String, require: true },
    description: { type: String, require: true },
    imageUrl: { type: String, require: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "users", require: true },
    lesson: [{ type: Schema.Types.ObjectId, ref: "lessons" }],
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("courses", schema);
