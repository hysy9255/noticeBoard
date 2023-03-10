const request = require("supertest");
const { createApp } = require("../../app.js");

const app = createApp();

const retrieveAllPosts = async () => {
  const response = await request(app).get("/allPosts").send();
  return response;
};

const createAPost = async (title, contents, token) => {
  const response = await request(app)
    .post("/posts")
    .set("authorization", token)
    .send({ title, contents });
  return response;
};

const retrieveAPost = async (postId) => {
  const response = await request(app).get("/posts").send({ postId });
  return response;
};

const updateAPost = async (postId, newTitle, newContents, token) => {
  const response = await request(app)
    .patch("/posts")
    .set("authorization", token)
    .send({ postId, newTitle, newContents });
  return response;
};

const deleteAPost = async (postId, token) => {
  const response = await request(app)
    .delete("/posts")
    .set("authorization", token)
    .send({ postId });
  return response;
};

const createAComment = async (postId, contents, token) => {
  const response = await request(app)
    .post("/comments")
    .set("authorization", token)
    .send({ postId, contents });
  return response;
};

const updateAComment = async (postId, commentId, newContents, token) => {
  const response = await request(app)
    .patch("/comments")
    .set("authorization", token)
    .send({ postId, commentId, newContents });
  return response;
};

const deleteAComment = async (postId, commentId, token) => {
  const response = await request(app)
    .delete("/comments")
    .set("authorization", token)
    .send({ postId, commentId });
  return response;
};

module.exports = {
  createAPost,
  retrieveAPost,
  updateAPost,
  deleteAPost,
  retrieveAllPosts,
  createAComment,
  updateAComment,
  deleteAComment,
};
