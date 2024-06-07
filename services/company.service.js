const CompanyModel = require("../models/company.model");

module.exports = {
  async createCompany(recruiter, company) {
    const newCompany = await CompanyModel.create({
      owner: recruiter,
      ...company,
    });
    return newCompany;
  },

  async getCompanyProfileByAccountId(accountId) {
    try {
    const companyProfile = await CompanyModel.findOne({
      accountId: accountId,
    });
    return companyProfile || null;
    // if (companyProfile.length === 0) {
    //   return null;
    // }
    // return companyProfile;
  }
  catch (error) {
    console.error("Error fetching company profile data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
}
