const request = require("supertest");
const { createApp } = require("../../app.js");

const app = createApp();

const createAComment = async (commentData) => {
  const response = await request(app).post("/comments").send(commentData);
  const responseBody = {
    postId: response.body.data._id,
    author: response.body.data.comments[0].author,
    contents: response.body.data.comments[0].contents,
  };
  const comment_id = response.body.data.comments[0]._id;
  return { responseBody, comment_id };
};

const updateAComment = async (newCommentData) => {
  const response = await request(app).patch("/comments").send(newCommentData);
  return response.body.data;
};

const deleteAComment = async (data) => {
  const response = await request(app).delete("/comments").send(data);
  return response.body.data;
};
//   //   const updatedResponse = await request(app)
//   //     .patch("/comments")
//   //     .send(newCommentData);

module.exports = { createAComment, updateAComment, deleteAComment };
