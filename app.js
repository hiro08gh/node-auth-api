import express from "express";
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from 'morgan';

const isProduction = process.env.NODE_ENV === "production";

const app = express();

mongoose
  .connect(
    "mongodb://localhost/node-auth",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connectedto db");
  })
  .catch(err => {
    console.log("Not connect db", err);
  });

mongoose.set("combined", true);
app.use(logger("short"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

require("./models/Users");
require("./config/passport");
app.use(require("./routes"));

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(8080, () => console.log(`Server running on http://localhost:8080`));

module.exports = app;
