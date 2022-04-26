const Joi = require("joi");
const mongoose = require("mongoose");
const { string } = require("joi");
const config = require("config");
const debug = require("debug")("app:user");
const jwt = require("jsonwebtoken");
const UserScema = new mongoose.Schema({
  navn: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  acces: ["admin", "seller,client"],
});

UserScema.methods.gernerateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      acces: this.access,
    },
    config.get("token")
  );
  return token;
};

const User = mongoose.model("User", UserScema);

function validate(user) {
  const schema = Joi.object({
    navn: Joi.string().required(),
    Email: Joi.string().required(),
    password: Joi.string().required(),
    acces: Joi.string().valid("admin", "seller", "client").required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.Validate = validate;
