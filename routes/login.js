const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const joi = require("joi");
const { User } = require("../models/user");

route.post("/", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ Email: req.body.Email });
  if (!user) return res.status(400).send("ugyldig brugernavn eller password");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(404).send("ugyldig brugernavn eller password");
  res.send(user.gernerateAuthToken());
});

function Validate(req) {
  const scema = joi.object({
    Email: joi.string().required().email(),
    password: joi.string().required(),
  });
  return scema.validate(req);
}

module.exports = route;
