const mongose = require("mongoose");
const JOI = require("joi");
JOI.objectId = require("joi-objectid")(JOI);

const produktSceama = new mongose.Schema({
  katergori: String,
  titel: { type: String, required: true },
  besk: String,
  sti: String,
  publicId: String,
  antal: { type: Number, min: 1 },
  enhed: String,
  pris: { type: Number, required: true },
  seller: { type: mongose.Types.ObjectId, required: true },
});
const Produkt = mongose.model("produkts", produktSceama);

// const prudukter = [{
//     Id: 1,
//     katergori: "grøntsager",
//     titel: "Kartofler",
//     besk: "2 kg Linzer kartofler",
//     sti: "kartofler.jpg",
//     antal: "2",
//     enhed: "Kg",
//     pris: "20"
// },
//     {r
//         Id: 2,
//         katergori: "grøntsager",
//         titel: "Ærter",
//         besk: "500 g ærter fra egen avl",
//         sti: "aerter.jpg",
//         antal: "500",
//         enhed: "gram",
//         pris: "25"
//     },
//     {
//         Id: 3,
//         katergori: "frugt",
//         titel: "Jordbær",
//         besk: "Dagfriske jordbær fra egen mark",
//         sti: "jordbaer.jpg",
//         antal: "500",
//         enhed: "gram",
//         pris: "25"
//     },
//     {
//         Id: 4,
//         katergori: "grøntsager",
//         titel: "Gulerødder",
//         besk: "I tre forskellige farver",
//         sti: "guleroedder.jpg",
//         antal: "1",
//         enhed: "Kg",
//         pris: "20"
//     }];
function validDateProd(prod) {
  const schema = JOI.object({
    katergori: JOI.string().min(3).required(),
    titel: JOI.string().min(3).required(),
    besk: JOI.string(),
    sti: JOI.string().min(5),
    publicId: JOI.string().min(1),
    antal: JOI.number().integer().min(1).required(),
    enhed: JOI.string(),
    pris: JOI.number().required(),
    seller: JOI.objectId().required(),
  });
  return schema.validate(prod);
}

exports.Produkt = Produkt;
exports.validate = validDateProd;
