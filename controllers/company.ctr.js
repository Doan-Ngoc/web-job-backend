const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const asyncHandler = require("../utils/AsyncHandler");
const companyService = require("../services/company.service");
const companyModel = require("../models/company.model")

module.exports = {
  createCompany: asyncHandler(async (req, res) => {
    const associatedCompany = await companyService.getCompanyByRecruiter(
      req.user.id
    );

    if (associatedCompany) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Account has already associated with a company" });
    }

    const newCompany = await companyService.create(req.user.id, req.body);
    return res.status(StatusCodes.CREATED).json({ data: newCompany });
  }),

  getCompanyByAccount: asyncHandler(async (req, res) => {
    const associatedCompany = await companyService.getCompanyByRecruiter(
      req.user.id
    );

    if (!associatedCompany) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Account has not associated with any company" });
    }
  }),

  // Add company profile to database
  async createCompanyProfile(req, res) {
    try {
          const companyProfile = new  companyModel({
            accountId: req.body.accountId,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            workingFields: req.body.workingFields,
            description: req.body.description,
          });
    
          await companyProfile.save();
    
          res.json({ status: "Company profile created successfully" });
        } catch (err) {
          console.log(err)
          return res
            .status(400)
            .json({ success: false, error: "An error occurred" });
        }
      },
};
