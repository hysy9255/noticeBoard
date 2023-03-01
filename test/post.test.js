const mongoose = require("mongoose");
require("dotenv").config({ path: "../env/.env" });
const {
  createAPost,
  retrieveAPost,
  updateAPost,
  deleteAPost,
  retrieveAllPosts,
} = require("./supertest/posts.js");

const { data, newData } = require("./testData/testData.js");

describe("Test the Post APIs", () => {
  let postId;

  beforeAll(async () => {
    await mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DATABASE_URI_FOR_POSTS).then(() => {
      console.log("Test database has been connected!");
    });
  });

  afterAll(async () => {
    await mongoose.connection.close().then(() => {
      console.log("Test database has been closed!");
    });
  });

  beforeEach(async () => {
    postId = await createAPost(data);
  });

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  });

  it("retrieves all the posts", async () => {
    // when
    const response = await retrieveAllPosts();
    // given
    expect(response.body.message).toEqual("All posts has been retrieved");
  });

  it("retrieves a post", async () => {
    // when
    const response = await retrieveAPost(postId);
    // expect
    expect(response).toEqual(data);
  });

  it("updates a post", async () => {
    newData.postId = postId;
    // when
    const response = await updateAPost(newData);
    // expect
    expect(response).not.toEqual(data);
  });

  it("deletes a post", async () => {
    // when
    await deleteAPost(postId);
    const response = await retrieveAPost(postId);
    // expect
    expect(response).toBe(null);
  });
});
