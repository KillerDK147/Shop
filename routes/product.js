const express = require("express");
const route = express.Router();
const { Produkt, validate } = require("../models/product");
const mongoose = require("mongoose");
const isValidObjectId = require("../middelware/validDateObjectId");
const auth = require("../middelware/auth");
var cloudinary = require("cloudinary").v2;
route.get("/", async (req, res) => {
  res.send(await Produkt.find());
});

route.post("/", auth, async (req, res) => {
  console.log(req.body.titel);
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.message);
  const prod = new Produkt({ ...req.body });
  await prod.save();
  res.send(prod);
});

route.get("/:id", isValidObjectId, async (req, res) => {
  const prod = await Produkt.findById(req.params.id);
  if (!prod) return res.status(404).send(`Produkctet Findes ikke`);
  //   const prod = products.find((p) => p.Id === parseInt(req.params.id));
  //   if (!prod)
  //     return res
  //       .status(404)
  //       .send(`Produkctet med det id ${req.params.id} Findes ikke`);
  res.send(prod);
});
route.get("/seller/:id", async (req, res) => {
  const sellerId = mongoose.isValidObjectId(req.params.id);
  if (!sellerId) return res.status(404).send("User not Found");
  res.send(await Produkt.find({ seller: req.params.id }));
});
route.delete("/:id", async (req, res) => {
  if (!prod) return res.status(404).send("Produkter Findes ikke");
  const prod = await Produkt.findById(req.params.id);
  cloudinary.config({
    cloud_name: "cloud_name",
    api_key: "cloud_key",
    api_secret: "cloud_secret",
  });
  cloudinary.uploader.destroy(prod.publicId, function (error, result) {
    console.log(result, error);
  });
  await Produkt.findByIdAndDelete(req.params.id);
  res.send(prod);
});

route.put("/:id", async (req, res) => {
  const prod = await Produkt.findByIdAndUpdate(
    req.params.id,
    {
      titel: req.body.titel,
      besk: req.body.besk,
      sti: req.body.sti,
      antal: req.body.antal,
      enhed: req.body.enhed,
      pris: req.body.pris,
    },
    { new: true }
  );
  if (!prod) return res.status(404).send("produkten Findes ikke");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  res.send(prod);
  prod.save();
});
module.exports = route;
