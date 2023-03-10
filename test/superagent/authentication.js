const superagent = require("superagent");

const signUp = async (name, email, password) => {
  const response = await superagent
    .post("http://localhost:8000/auth")
    .send({ name, email, password });
  return response;
};

const signIn = async (email, password) => {
  const response = await superagent
    .get("http://localhost:8000/auth")
    .send({ email, password });
  return response;
};

const deleteAccount = async (token, password) => {
  const response = await superagent
    .delete("http://localhost:8000/auth")
    .set("authorization", token)
    .send({ password });
  return response;
};

module.exports = { signUp, signIn, deleteAccount };
