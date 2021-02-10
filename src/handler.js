const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const collection = "CasaObra";
const uri = process.env.ATLAS_URI + collection;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection estabilished successfully");
});

const companiesRouter = require("./modules/companies/company.route");
app.use("/companies", companiesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
