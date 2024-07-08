const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("@utils/AsyncHandler");
const path = require('path');
const applicantService = require("../services/applicant.service");
const deleteUploadedFiles = require('../middlewares/deleteUploadedFile')

module.exports = {
  createApplicantProfile: asyncHandler(async (req, res) => {
  try {
    const associatedProfile = await applicantService.findProfileByAccountId(
      req.body.accountId
    );
    if (associatedProfile) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Account is already associated with a profile",
      });
    }

    const baseDirectory = path.join(__dirname, '../uploads/');
    function getRelativePath(filePath) {
      return path.relative(baseDirectory, filePath).replace(/\\/g, '/');
    }

    const defaultAvatar = path.join('profilePictures/applicantAvatars/default-avatar.jpg');
    const profilePicturePath = req.files.profilePicture ? getRelativePath(req.files.profilePicture[0].path) : defaultAvatar;
    const applicantCV = req.files.applicantCV ? getRelativePath(req.files.applicantCV[0].path) : null;
     
    const newAppicantProfile = await applicantService.createApplicantProfile(
      req.body, profilePicturePath, applicantCV
    );
    return res.status(StatusCodes.CREATED).json({
      newProfile: newAppicantProfile,
    });
  }
  catch (error) {
    console.error("Error uploading profile data:", error);
    deleteUploadedFiles(req)
    return res
      .status(400)
      .json({ success: false, error: "Error uploading profile data" });
  }}
),

getApplicantProfileByAccount: asyncHandler(async (req, res) => {
    try {
    const existingApplicantProfile = await applicantService.findProfileByAccountId(
      // req.user.id
      req.params.accountId
    );
    res.json(existingApplicantProfile)
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
    // if (!existingApplicantProfile) {
    //   return res.status(StatusCodes.NOT_FOUND).json({
    //     message: "User profile does not exist",
    //   });
    // }

    // return res.status(StatusCodes.CREATED).json({
    //   data: existingUserProfile,
    // });
  }),
};
