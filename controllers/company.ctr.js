const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const asyncHandler = require("../utils/AsyncHandler");
const companyService = require("../services/company.service");
const companyModel = require("../models/company.model")

module.exports = {
  // createCompany: asyncHandler(async (req, res) => {
  //   const associatedProfile = await companyService.getCompanyProfileByAccountId(
  //     req.body.accountId
  //   );

  //   if (associatedProfile) {
  //     return res
  //       .status(StatusCodes.BAD_REQUEST)
  //       .json({ message: "Account has already associated with a profile" });
  //   }

  //   const newCompany = await companyService.create(req.user.id, req.body);
  //   return res.status(StatusCodes.CREATED).json({ data: newCompany });
  // }),

    //Find a company profile by the account id
  getCompanyProfileByAccount: asyncHandler(async (req, res) => {
    try {
      const associatedProfile = await companyService.getCompanyProfileByAccount(
        req.params.accountId
      );
      res.json(associatedProfile);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }),

  // Add company profile to database
  async createCompanyProfile(req, res) {
    try {
      const associatedProfile = await companyService.getCompanyProfileByAccountId(
        req.body.accountId
      );
  
      if (associatedProfile) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Account has already associated with a profile" });
      }
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

      //Find a company profile by the account id
      // async getCompanyProfileByAccountId(req, res) {
      //   try {
      //     const profileId = req.params.profileId;
      //     const profile = await companyModel.findById(profileId);
    
      //     if (!profile) {
      //        return res.status(404).json({ error: "Profile not found" });
      //     }
      //     res.json(profile);
      //   } catch (error) {
      //     console.error("Error fetching profile data:", error);
      //     res.status(500).json({ error: "Internal Server Error" });
      //   }
      // },

};
