const mongoose = require('mongoose');
const constants = require('@constants');

const applicantProfileSchema = mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
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
}, { toJSON: { virtuals: true } });

const applicantProfileModel = mongoose.model('ApplicantProfile', applicantProfileSchema);

module.exports = applicantProfileModel;
