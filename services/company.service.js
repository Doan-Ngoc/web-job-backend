const CompanyModel = require("../models/company.model");

module.exports = {
  async createCompany(profileData, photoPath) {
    try{
    const profile = {
      ...profileData,
      logo: photoPath
    }
    const newCompanyProfile = await CompanyModel.create(
      profile
    );
    return newCompanyProfile;
  } catch(error) {
    console.error("Error uploading profile data:", error);
    res.status(400).json({ error: "Bad Request" });
  }},

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
