const mongoose = require("mongoose");
const supertest = require("./supertest/supertest.js");
const superagent = require("./superagent/authentication.js");
const {
  data,
  newData,
  userInfo,
  commentData,
  newCommentData,
} = require("./testData/testData.js");

describe("Test the Post & Comment APIs", () => {
  let postId;
  let token;
  let commentId;

  beforeAll(async () => {
    await mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DATABASE_URI).then(() => {
      console.log("Test database has been connected!");
    });
    // sign up and sign in before all
    const signUpResponse = await superagent.signUp(
      userInfo.name,
      userInfo.email,
      userInfo.password
    );
    console.log(signUpResponse.body.message);
    const signInResponse = await superagent.signIn(
      userInfo.email,
      userInfo.password
    );
    token = signInResponse.body.token;
    console.log(signInResponse.body.message);
  });

  afterAll(async () => {
    const response = await superagent.deleteAccount(token, userInfo.password);
    console.log(response.body.message);

    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    await mongoose.connection.close().then(() => {
      console.log("Test database has been closed!");
    });
  });

  test("create a post", async () => {
    // given
    // when
    const response = await supertest.createAPost(
      data.title,
      data.contents,
      token
    );
    postId = response.body.data._id;
    // expect
    expect(response.body.data.contents).toBe(data.contents);
    console.log(response.body.message);
  });

  test("retrieve a post", async () => {
    // given
    // when
    const response = await supertest.retrieveAPost(postId);
    // expect
    expect(response.body.data.contents).toBe(data.contents);
    console.log(response.body.message);
  });

  test("update a post", async () => {
    // given
    // when
    const response = await supertest.updateAPost(
      postId,
      newData.newTitle,
      newData.newContents,
      token
    );
    // expect
    expect(response.body.data.contents).toBe(newData.newContents);
    console.log(response.body.message);
  });

  test("create a comment", async () => {
    // given
    const commentData = {
      contents: "나는 스벅에서 아메리카노를 많이 먹어",
    };
    // when
    const response = await supertest.createAComment(
      postId,
      commentData.contents,
      token
    );
    commentId = response.body.data.comments[0]._id;
    // expect
    expect(response.body.data.comments[0].contents).toBe(commentData.contents);
    console.log(response.body.message);
  });

  test("update a comment", async () => {
    // given
    // when
    const response = await supertest.updateAComment(
      postId,
      commentId,
      newCommentData.newContents,
      token
    );
    // expect
    expect(response.body.data.contents).toBe(newCommentData.newContents);
    console.log(response.body.message);
  });

  test("delete a comment", async () => {
    // given
    // when
    const response = await supertest.deleteAComment(postId, commentId, token);
    //expect
    expect(response.body.data.comments[0]).toBe(undefined);
    console.log(response.body.message);
  });

  test("deletes a post", async () => {
    // when
    const response = await supertest.deleteAPost(postId, token);
    // expect
    expect(response.body.deletedPost._id).toBe(postId);
    console.log(response.body.message);
  });
});
