const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    type: {
      type: String
    },
    parts: {
      type: []
    },
    services: {
      type: []
    }
  },
  {
    timestamps: true
  }
);

const company = mongoose.model("Company", companySchema, "companies");

module.exports = company;
