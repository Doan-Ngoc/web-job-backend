const applicantProfileModel = require('@models/applicant.model');

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

  async createApplicantProfile(profileData) {
    const newApplicantProfile = await applicantProfileModel.create(
      profileData
    );

    return newApplicantProfile;
  },
};
