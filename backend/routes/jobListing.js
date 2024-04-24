const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const JobListing = require("../schema/jobListingSchema");

router.get("/listing", async (req, res) => {
  try {
    const jobList = await JobListing.find();
    res.status(200).send(jobList);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
