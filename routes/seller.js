const express = require("express");
const route = express.Router();
const { Seller, validate } = require("../models/seller");
const startDebug = require("debug")("app:seller");
const auth = require("../middelware/auth");
const validDateObjectId = require("../middelware/validDateObjectId");

route.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  startDebug(req.body);
  const seller = new Seller({ ...req.body });
  await seller.save();
  res.send(seller);
  startDebug(seller);
});

route.get("/", async (req, res) => {
  res.send(await Seller.find());
});
route.get("/:id", validDateObjectId, async (req, res) => {
  const seller = await Seller.findById(req.params.id);
  if (!seller) return res.status(404).send("No such seller found");
  res.send(seller);
});
route.delete("/:id", validDateObjectId, async (req, res) => {
  const sellerId = await Seller.findByIdAndDelete(req.params.id);
  if (!sellerId) return res.status(404).send("No such seller found");
  res.send(sellerId);
});
route.put("/:id", validDateObjectId, async function (req, res) {
  const seller = await Seller.findByIdAndUpdate(
    req.params.id,
    {
      navn: req.body.navn,
      address: req.body.address,
      tlf: req.body.tlf,
      email: req.body.email,
    },
    { new: true }
  );
  if (!seller) return res.status(404).send("User not found");
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send("Kunne ikke ændre oplysninger " + error.details[0].message);
  res.send(seller);
  seller.save();
});
module.exports = route;
