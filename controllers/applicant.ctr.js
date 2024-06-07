const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("@utils/AsyncHandler");
const applicantService = require("../services/applicant.service");

module.exports = {
  createUserProfile: asyncHandler(async (req, res) => {
    const existingUserProfile = await applicantService.findProfileByAcccountId(
      req.user.id
    );
    if (existingUserProfile) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User profile has already existed",
      });
    }

    const newProfile = await applicantService.createUserProfile(
      req.user.id,
      req.body
    );

    return res.status(StatusCodes.CREATED).json({
      data: newProfile,
    });
  }),

  getApplicantProfile: asyncHandler(async (req, res) => {
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
