const { checkVariables, authentication } = require("../middlewares/helper");
const { Comment } = require("../models/Articles");

const router = require("express").Router();

router.post(
  "/comment",
  checkVariables(["comment", "articleId"]),
  authentication,
  async (req, res) => {
    try {
      const data = req.body;
      const comment = new Comment(data);

      const response = await comment.save();
      return res.send(200, response);
    } catch (error) {
      console.log(error);
      return res.send(500, "Comment Add error");
    }
  }
);

router.get(
  "/prediction/getPredictions",
  authentication,
  async (req, res) => {}
);

module.exports = router;
