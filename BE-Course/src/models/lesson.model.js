const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    videoUrl: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "course", required: true },
    nameLesson: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lessons", schema);
