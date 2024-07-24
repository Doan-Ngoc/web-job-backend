const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const asyncHandler = require("../utils/AsyncHandler");
const companyService = require("../services/company.service");
const companyModel = require("../models/company.model")
const deleteUploadedFiles = require('../middlewares/deleteUploadedFile')
const path = require('path');

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
      const associatedProfile = await companyService.getCompanyProfileByAccountId(
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
          .json({ message: "Account is already associated with a profile" });
      }

      const baseDirectory = path.join(__dirname, '../uploads/');
      function getRelativePath(filePath) {
        return path.relative(baseDirectory, filePath).replace(/\\/g, '/');
      }
      // const defaultAvatar = path.join('profilePictures/applicantAvatars/default-avatar.jpg');
      if (!req.file) {
        throw new Error("A company logo is required.");
      }
      const companyLogoPath = getRelativePath(req.file.path);
      const newCompanyProfile = await companyService.createCompany(
        req.body, companyLogoPath
      )
      return res.status(StatusCodes.CREATED).json({
        newProfile: newCompanyProfile,
      });
    } catch (err) {
      console.error("Error uploading profile data:", err.message);
      deleteUploadedFiles(req)
      return res
        .status(400)
        .json({ success: false, error: "Error uploading profile data" });
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
