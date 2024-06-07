const ProfileModel = require('@models/applicant.model');

module.exports = {
  async findProfileByAccountId(accountId) {
    const applicantProfile = await ProfileModel.findOne({
      accountId: accountId,
    });

    return applicantProfile || null;
  },

  async createUserProfile(user, profile) {
    const newUserProfile = await ProfileModel.create({
      owner: user,
      ...profile,
    });

    return newUserProfile;
  },
};
