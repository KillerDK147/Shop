const Joi = require("joi");
const mongoose = require("mongoose");
const debug = require("debug")("app:sellerModel");

const ClientScema = new mongoose.Schema({
  navn: { type: String, required: true },
  address: { type: String, required: true },
  by: { type: String, required: true },
  pno: { type: Number, required: true },
  tlf: { type: String, required: true, maxlength: 8 },
  email: { type: String, required: true, minlength: 5 },
});

const Seller = mongoose.model("Seller", ClientScema);

function validDateProd(prod) {
  const schema = Joi.object({
    navn: Joi.string().required(),
    address: Joi.string().required(),
    by: Joi.string().required(),
    pno: Joi.number().required(),
    tlf: Joi.string().required().max(8),
    email: Joi.string().required().min(5),
  });
  return schema.validate(prod);
}

exports.Seller = Seller;
exports.validate = validDateProd;
