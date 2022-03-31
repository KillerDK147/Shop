const express = require("express");
const { send } = require("express/lib/response");
const bcrypt = require("bcrypt");
const route = express.Router();
const { User, Validate } = require("../models/user");
const userdebug = require("debug")("app:user");
const jwt = require("jsonwebtoken");
const config = require("config");

route.post("/reg", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = new User({ ...req.body });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = jwt.sign(
    {
      _id: user.id,
      access_token: user.access,
    },
    config.get("token")
  );
  await user.save();

  res
    .header("x-auth-token", token)
    .send({ navn: user.navn, Email: user.Email });
});

route.delete("/:id", async (req, res) => {
  const id = await User.findByIdAndDelete(req.params.id);
  if (!id) {
    return res.status(400).send("Missing required");
  }
  res.send(id);
});

route.get("/", async (req, res) => {
  res.send(await User.find());
});
route.get("/:id", async (req, res) => {
  res.send(await User.findById(req.params.id));
});

module.exports = route;
