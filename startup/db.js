const mongose = require("mongoose");
const config = require("config");
const dbDebug = require("debug")("app:db");

module.exports = function () {
  const db = config.get("db");
  mongose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => dbDebug(`Connect to ${db}`))
    .catch((err) => dbDebug("db Error" + err));
};
