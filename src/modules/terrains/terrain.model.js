const mongoose = require("mongoose");
mongoose.set("debug", true);
const Schema = mongoose.Schema;

const terrainSchema = new Schema(
  {
    name: {
      type: String
    },
    location: {
      type: []
    },
    area: {
      type: []
    }
  },
  {
    timestamps: true
  }
);

const terrain = mongoose.model("Terrain", terrainSchema, "terrains");

module.exports = terrain;
