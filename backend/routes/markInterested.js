const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const JobListing = require("../schema/jobListingSchema");

router.post("/:id/interested", async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.body.userId;

    const jobListings = await JobListing.findOne({ jobId: jobId });
    if (jobListings) {
      if (!jobListings.interestedApplicants.includes(userId)) {
        jobListings.interestedApplicants.push(userId);

        await jobListings.save();

        return res.status(200).send({
          message: "Job has been marked as interested",
          data: jobListings,
        });
      } else {
        return res.status(200).send({
          message: "User is already marked as interested in this job",
          data: jobListings,
        });
      }
    }

    res.status(404).send({ message: "Job listing not found" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
