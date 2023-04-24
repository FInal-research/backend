const { checkVariables, authentication } = require("../middlewares/helper");
const { Articles, Comment } = require("../models/Articles");

const router = require("express").Router();

router.post(
  "/article/addArticle",
  checkVariables(["topic", "body"]),
  //   authentication,
  async (req, res) => {
    try {
      const article = new Articles(req.body);
      const response = await article.save();

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Add articles server error");
    }
  }
);

router.get("/article/getArticles", async (req, res) => {
  try {
    const articles = await Articles.find().populate("comments").exec();
    if (articles.length > 0) return res.status(200).send(articles);
    return res.status(401).send("No articles found");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Get articles server error");
  }
});

//add comment
router.post("/article/:id/comment", async (req, res) => {
  try {
    const articleId = req.params.id;
    const comment = req.body.comment;

    const newComment = new Comment({
      articleId: articleId,
      comment: comment,
    });

    const savedComment = await newComment.save();

    const updatedArticle = await Articles.findByIdAndUpdate(
      articleId,
      { $push: { comments: savedComment._id } },
      { new: true }
    );
    return res.status(200).send(updatedArticle);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error adding comment");
  }
});

router.delete("/article/:articleId/comment/:commentId", async (req, res) => {
  try {
    const { articleId, commentId } = req.params;

    const response = await Articles.findByIdAndUpdate(articleId, {
      $pull: { comments: { _id: commentId } },
    });
    return res.send(200, response);
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment." });
    return;
  }
});

module.exports = router;
