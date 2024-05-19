const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    videoUrl: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "course", required: true },
    nameLesson: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "users" },
    fileHomework: { type: String, required: true },
    assignments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "users" },
        fileAssignment: { type: String },
        scores: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lessons", schema);
