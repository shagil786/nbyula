const mongoose = require("mongoose");

const jobListingSchema = new mongoose.Schema({
  jobId: {
    type: Number,
    unique: true,
    required: true,
  },
  title: String,
  description: String,
  location: String,
  deadLine: Date,
  phoneNumner: String,
  email: String,
  interestedApplicants: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("jobListing", jobListingSchema);
