const mongoose = require("mongoose");
require("dotenv").config({ path: "../env/.env" });
const { createAPost } = require("./supertest/posts.js");
const {
  createAComment,
  updateAComment,
  deleteAComment,
} = require("./supertest/comments.js");
const { data, commentData, newCommentData } = require("./testData/testData.js");

describe("Test the Comment APIs", () => {
  let postId;
  let commentId;

  beforeAll(async () => {
    await mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DATABASE_URI_FOR_COMMENTS).then(() => {
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

  it("creates a comment", async () => {
    // when
    commentData.postId = postId;
    const { responseBody } = await createAComment(commentData);
    // expect
    expect(responseBody).toEqual(commentData);
  });

  it("updates a comment", async () => {
    // given
    commentData.postId = postId;
    const { comment_id } = await createAComment(commentData);
    commentId = comment_id;
    // when
    newCommentData.postId = postId;
    newCommentData.commentId = commentId;
    const response = await updateAComment(newCommentData);
    // expect
    expect(response.comments[0].contents).toBe(newCommentData.newContents);
    expect(response.comments[0].contents).not.toBe(commentData.contents);
  });

  it("deletes a comment", async () => {
    // given
    commentData.postId = postId;
    const { comment_id } = await createAComment(commentData);
    commentId = comment_id;

    // when
    const data = {
      postId,
      commentId,
    };
    const response = await deleteAComment(data);
    //expect
    expect(response.comments[0]).toBe(undefined);
  });
});
