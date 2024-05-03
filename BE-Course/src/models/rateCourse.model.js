const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "courses", require: true },
    studentId: { type: Schema.Types.ObjectId, ref: "users", require: true },
    rate: { type: Number, default: 1, require: true },
    comment: { type: String, default: "", require: true}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rate-course", schema);
