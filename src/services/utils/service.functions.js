// ***
const reconstructObject = (inputArray) => {
  newarray = [];
  for (let i = 0; i < inputArray.length; i++) {
    const outerObject = {};
    const comment = {};
    comment.contents = inputArray[i].contents;
    comment.createdAt = inputArray[i].createdAt;
    comment.updatedAt = inputArray[i].updatedAt;
    comment.commentId = inputArray[i].commentId;
    comment.likes = inputArray[i].likes ? inputArray[i].likes : 0;
    comment.usersWhoLiked = inputArray[i].users;
    outerObject.comment = comment;

    const author = {};
    author.accountId = inputArray[i].accountId;
    author.name = inputArray[i].name;
    author.email = inputArray[i].email;
    author.profileImage = inputArray[i].profileImage;
    outerObject.author = author;

    const user = {};
    user.likeStatus = inputArray[i].likeStatus;
    user.modifyAllowed = inputArray[i].modifyAllowed;
    user.deleteAllowed = inputArray[i].deleteAllowed;
    outerObject.user = user;

    newarray.push(outerObject);
  }

  return newarray;
};

module.exports = { reconstructObject };
