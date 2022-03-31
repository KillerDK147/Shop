const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
test("User.genrareUserToken - should return valid jwt token", () => {
  const id = new mongoose.Types.ObjectId();
  const user = new User({ _id: id });
  const token = user.gernerateAuthToken();
  const decoded = jwt.verify(token, config.get("token"));
  expect(decoded).toMatchObject({ _id: id });
});
