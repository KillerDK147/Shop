const products = require("../routes/product");
const seller = require("../routes/seller");
const compression = require("compression");
const helmet = require("helmet");
const cores = require("cors");
const user = require("../routes/User");
const login = require("../routes/login");
module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
  app.use(cores());
  app.use("/api/produkter", products);
  app.use("/api/seller", seller);
  app.use("/api/user", user);
  app.use("/api/login", login);
};
