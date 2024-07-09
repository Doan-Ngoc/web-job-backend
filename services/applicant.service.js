const applicantProfileModel = require('@models/applicant.model');
const multer = require('multer')
const deleteUploadedFiles = require('../middlewares/deleteUploadedFile')

module.exports = {
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
  }},

  async createApplicantProfile(profileData, photoPath, cvPath) {
  try{
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
  }}
};
