const request = require("supertest");
const { createApp } = require("../../app.js");

const app = createApp();

const retriveAllPosts = async () => {
  const response = await request(app).get("/allPosts").send();
  return response;
};

const createAPost = async (requestData) => {
  const response = await request(app).post("/posts").send(requestData);
  const postId = response.body.data._id;
  return postId;
};

const retriveAPost = async (postId) => {
  try {
    const response = await request(app).get("/posts").send({ postId });
    const responseBody = {
      title: response.body.data.title,
      author: response.body.data.author,
      contents: response.body.data.contents,
    };
    return responseBody;
  } catch {
    return null;
  }
};

const updateAPost = async (newData) => {
  const response = await request(app).patch("/posts").send(newData);
  const responseBody = {
    title: response.body.data.title,
    author: response.body.data.author,
    contents: response.body.data.contents,
  };
  return responseBody;
};

const deleteAPost = async (postId) => {
  const response = await request(app).delete("/posts").send({ postId });
  return response;
};

module.exports = {
  createAPost,
  retriveAPost,
  updateAPost,
  deleteAPost,
  retriveAllPosts,
};
