const { postDao, commentDao } = require("./../models/report.dao.js");

const postServ = {
  report: async (postId) => {
    await postDao.report(postId);
  },
  showReports: async () => {
    return await postDao.showReports();
  },
};

const commentServ = {
  report: async (commentId) => {
    await commentDao.report(commentId);
  },
  showReports: async () => {
    return await commentDao.showReports();
  },
};

module.exports = { postServ, commentServ };
