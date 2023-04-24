const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const articlesSchema = new schema(
  {
    topic: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },

  { timestamps: true }
);
const commentSchema = new schema(
  {
    comment: {
      type: String,
      require: true,
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);
const Articles = mongoose.model("Article", articlesSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Articles, Comment };