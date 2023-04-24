const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const predictionSchema = new schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    predictionScore: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);
