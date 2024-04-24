const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jobListing = require("./routes/jobListing");
const addJobs = require("./routes/addJob");
const addUser = require("./routes/addUser");
const userLogin = require("./routes/userLogin");
const markInterested = require("./routes/markInterested");

require("dotenv/config");
const app = express();
const port = process.env.PORT;

const authJwt = require("./config/jwt");

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(authJwt());

const api = process.env.BASE_URL;

console.log(`${api}/jobs`);

app.use(`${api}/jobs`, addJobs);
app.use(`${api}/jobs`, jobListing);
app.use(`${api}/jobs`, markInterested);
app.use(`${api}/jobs`, addUser);
app.use(`${api}/jobs`, userLogin);

const dbConfig = require("./config/dbConfig");
mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
