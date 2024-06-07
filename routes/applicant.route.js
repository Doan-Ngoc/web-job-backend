const { Router } = require("express");
const allowTo = require("../middlewares/allowTo");
const { roles } = require("../constants");
const applicantCtr = require("../controllers/applicant.ctr");
const userProfileValidation = require("../middlewares/validations/userProfile.validation");
const validate = require("../middlewares/ValidationHandler");

const router = Router();

router.post(
  "/",
  allowTo(roles.applicant),
  userProfileValidation,
  validate,
  applicantCtr.createUserProfile
);

router.get("/profile/:accountId", 
applicantCtr.getApplicantProfile);

module.exports = router;
