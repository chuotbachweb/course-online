const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    nameRecruitment: { type: String, require: true },
    description: { type: String, require: true },
    quantity: { type: Number, require: true, default: 1 },
    studentApply: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "users" },
        fileCV: { type: String, require: true },
        status: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("recruitment", schema);
