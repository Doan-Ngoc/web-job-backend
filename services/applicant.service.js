const applicantProfileModel = require('@models/applicant.model');
const multer = require('multer')
const deleteUploadedFiles = require('../middlewares/deleteUploadedFile')

module.exports = {

  async findProfileByProfileId(profileId) {
    try {
      const applicantProfile = await applicantProfileModel.findById(profileId);
      return applicantProfile || null;
    }
    catch (error) {
      console.error("Error fetching profile data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async findProfileByAccountId(accountId) {
    try {
      const applicantProfile = await applicantProfileModel.findOne({
        accountId: accountId,
      });

      return applicantProfile || null;
    }
    catch (error) {
      console.error("Error fetching profile data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createApplicantProfile(profileData, photoPath, cvPath) {
    try {
      const profile = {
        ...profileData,
        profilePicture: photoPath,
        applicantCV: cvPath
      }
      const newApplicantProfile = await applicantProfileModel.create(
        profile
      );
      return newApplicantProfile;
    }
    catch (error) {
      console.error("Error uploading profile data:", error);
      res.status(400).json({ error: "Bad Request" });
    }
  },

  async deleteApplication(applicantProfile, appliedJob) {
    try {
      const jobId = appliedJob._id.toString()
      const jobIndex = applicantProfile.appliedJobs.findIndex(
        (job) => job.jobId.toString() === jobId
      );
      if (jobIndex > -1) {
        applicantProfile.appliedJobs.splice(jobIndex, 1);
        await applicantProfile.save();
      }
      const profileId = applicantProfile._id.toString()
      const applicantIndex = appliedJob.applicantList.findIndex(
        (application) => application.profileId.toString() === profileId
      );

      if (applicantIndex > -1) {
        appliedJob.applicantList.splice(applicantIndex, 1);
        await appliedJob.save();
      }
    }
    catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
