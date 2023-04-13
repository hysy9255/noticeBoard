const { postServ, commentServ } = require("./../services/report.service.js");
const { asyncWrap } = require("./../utils/error.js");

const post = {
  report: asyncWrap(async (req, res) => {
    const postId = req.body.postId;
    await postServ.report(postId);
    res.status(201).json({ message: "Post has been reported" });
  }),
  showReports: asyncWrap(async (req, res) => {
    const reportedPosts = await postServ.showReports();
    res.status(200).json(reportedPosts);
  }),
};

const comment = {
  report: asyncWrap(async (req, res) => {
    const { commentId } = req.body;
    await commentServ.report(commentId);
    res.status(201).json({ message: "Comment has been reported" });
  }),
  showReports: asyncWrap(async (req, res) => {
    const reportedComments = await commentServ.showReports();
    res.status(200).json(reportedComments);
  }),
};

module.exports = { post, comment };
