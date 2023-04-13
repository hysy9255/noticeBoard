const reconstructObject = (myarray) => {
  newarray = [];
  for (let i = 0; i < myarray.length; i++) {
    const outerObject = {};
    const comment = {};
    comment.contents = myarray[i].contents;
    comment.createdAt = myarray[i].createdAt;
    comment.updatedAt = myarray[i].updatedAt;
    comment.commentId = myarray[i].commentId;
    comment.likes = myarray[i].likes ? myarray[i].likes : 0;
    comment.usersWhoLiked = myarray[i].users;
    outerObject.comment = comment;

    const author = {};
    author.accountId = myarray[i].accountId;
    author.name = myarray[i].name;
    author.email = myarray[i].email;
    author.profileImage = myarray[i].profileImage;
    outerObject.author = author;

    const user = {};
    user.likeStatus = myarray[i].likeStatus;
    user.modifyAllowed = myarray[i].modifyAllowed;
    user.deleteAllowed = myarray[i].deleteAllowed;
    outerObject.user = user;

    newarray.push(outerObject);
  }

  return newarray;
};

module.exports = { reconstructObject };
