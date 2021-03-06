const router = require("express").Router();
let terrainModel = require("../companies/company.model");

router.route("/modules/terrains").get((req, res) => {
  terrainModel
    .find({ type: req.params.type })
    .then((equip) => res.json(equip))
    .catch((err) => res.status(400).json("Error: " + err));
});

/*router.route("/findByType/:type").get((req, res) => {
  terrainModel.find({ type: req.params.type })
    .then((equip) => res.json(equip))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/findByType/update/:type").post((req, res) => {
  terrainModel.findOneAndUpdate({ type: req.params.type }, { $set: req.body })
    .then((equip) => res.json(equip))
    .catch((err) => res.status(400).json("Error: " + err));
});*/

module.exports = router;
