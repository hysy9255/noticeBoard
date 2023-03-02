const { userSchema } = require("../schema/user.schema");
const { conn2 } = require("../../dataSource.js");

const User = conn2.model("user", userSchema);

const getNameByEmail = async (email) => {
  try {
    const resultArr = await User.find({ email: email }, { name: 1, _id: 0 });
    const nameObj = resultArr[0];
    return nameObj.name;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getNameByEmail };
