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
  report: async (postId, commentId) => {
    await commentDao.report(postId, commentId);
  },
  showReports: async () => {
    return await commentDao.showReports();
  },
};

module.exports = { postServ, commentServ };
