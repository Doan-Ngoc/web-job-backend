const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { application } = require("../constants");

const applicationSchema = mongoose.Schema({
  profileId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'ApplicantProfile',
    required: true
  },
  status: {
    type: String,
    enum: application.status, 
    default: 'pending',
    required: true
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
});

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    logo: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    closedDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    salary: { type: String, required: true },
    location: { type: String, required: true },
    field: { type: String, required: true },
    position: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    applicantList: {
      type: [applicationSchema],
      default: []
    }
  },
  { toJSON: { virtuals: true } },
  { timestamps: true }
);
jobSchema.plugin(mongoosePaginate);

const JobModel = mongoose.model("Job", jobSchema, "AllJobs");

module.exports = JobModel;
