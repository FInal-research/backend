const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const commentSchema = new schema(
  {
    comment: {
      type: String,
      require: true,
    },
    articleId: {
      type: ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
