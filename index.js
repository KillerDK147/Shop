const express = require("express");
require("express-async-errors");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const error = require("./middelware/error");
const app = express();
app.use(express.json());
const startDebug = require("debug")("app:startup");
require("./startup/db")();

require("./startup/routes")(app);
app.use(error);

app.get("/", (req, res) => {
  res.send("hello my name is mr.negativ");
});
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  startDebug(`Lisening on port ${port}`);
});
module.exports = server;
