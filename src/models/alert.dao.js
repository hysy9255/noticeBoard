const mongoose = require("mongoose");
const { commentAlert } = require("../schemas/alert.schema");
const CommentAlert = mongoose.model("comment_alert", commentAlert);
// ***
const createAlert = {
  forComment: async (accountId, userName, postId, title, authorId) => {
    try {
      await CommentAlert.create({
        accountId,
        userName,
        postId,
        title,
        authorId,
      });
    } catch (error) {
      throw error;
    }
  },
};
// ***
const retrieveAlert = {
  forComment: async (accountId) => {
    const agg = [
      { $match: { authorId: accountId } },
      {
        $group: {
          _id: { postId: "$postId", readStatus: "$readStatus" },
          data: {
            $push: {
              accountId: "$accountId",
              name: "$userName",
              title: "$title",
            },
          },
        },
      },
    ];
    try {
      return await CommentAlert.aggregate(agg);
    } catch (error) {
      throw error;
    }
  },
};
// ***
const changeReadStatus = {
  forComment: async (requestData) => {
    const { accountIds, postId } = requestData;
    const filter = {
      $and: [
        {
          accountId: { $in: accountIds },
        },
        { postId },
        { readStatus: false },
      ],
    };
    try {
      await CommentAlert.updateMany(filter, {
        $set: { readStatus: true },
      });
    } catch (error) {
      throw error;
    }
  },
};
// ***
const deleteReadData = {
  forComment: async () => {
    try {
      await CommentAlert.deleteMany({ readStatus: true });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = {
  createAlert,
  retrieveAlert,
  changeReadStatus,
  deleteReadData,
};
