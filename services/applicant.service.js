const applicantProfileModel = require('@models/applicant.model');
const multer = require('multer')

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

  async createApplicantProfile(profileData, avatarPath) {
    // const newApplicantProfile = await applicantProfileModel.create(
    //   profileData
    // );
    const profile = {
      ...profileData,
      profilePicture: avatarPath
    }
    const newApplicantProfile = await applicantProfileModel.create(
      profile
    );
    console.log('profileData.body.working', profileData)
    console.log('profileData.file.path', avatarPath)
    console.log('full profile', profile)
    return newApplicantProfile;
  },
};
