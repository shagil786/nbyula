const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const JobListing = require("../schema/jobListingSchema");

router.post("/addJob", async (req, res) => {
  const title = req.body.title,
    description = req.body.description,
    location = req.body.location,
    deadLine = req.body.deadLine,
    phoneNumber = req.body.phoneNumber,
    email = req.body.email,
    jobId = req.body.jobId;

  try {
    const jobList = await JobListing({
      jobId: jobId,
      title: title,
      description: description,
      location: location,
      deadLine: deadLine,
      phoneNumber: phoneNumber,
      email: email,
    });

    const newJobListing = await jobList.save();

    res
      .status(200)
      .send({ message: "new Job Listing added", data: newJobListing });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
