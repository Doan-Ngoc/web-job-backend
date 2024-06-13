const CompanyModel = require("../models/company.model");

module.exports = {
  async createCompany(profileData) {
    const newCompanyProfile = await CompanyModel.create(
      profileData
    );
    return newCompanyProfile;
  },

  async getCompanyProfileByAccountId(accountId) {
    try {
    const companyProfile = await CompanyModel.findOne({
      accountId: accountId,
    });
    return companyProfile || null;
  }
  catch (error) {
    console.error("Error fetching company profile data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
}
