const mongoose = require('mongoose');
const { application } = require("../constants");

const appliedJobSchema = mongoose.Schema({
  jobId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  // jobTitle: {
  //   type: String,
  //   required: true
  // },
  // company: {
  //   type: String,
  //   required: true
  // },
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

const applicantProfileSchema = mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  workingFields: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
},
  applicantCV: {
    type: String,
  },
  attachment: String,
  appliedJobs: {
    type: [appliedJobSchema],
    default: []
  }
}, { toJSON: { virtuals: true } });



const applicantProfileModel = mongoose.model('ApplicantProfile', applicantProfileSchema);

module.exports = applicantProfileModel;
