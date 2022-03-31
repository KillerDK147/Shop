const jwt = require("jsonwebtoken");
const config = require("config");
const debug = require("debug")("app:auth");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Invalid token");
  debug(config.get("token"));
  try {
    const decoded = jwt.verify(token, config.get("token"));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invlid token cannot be verified");
  }
};
