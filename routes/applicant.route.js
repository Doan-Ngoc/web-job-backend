const { Router } = require("express");
const allowTo = require("../middlewares/allowTo");
const { roles } = require("../constants");
const applicantCtr = require("../controllers/applicant.ctr");
const applicantNewProfileValidation = require("../middlewares/validations/applicantNewProfile.validation");
const validate = require("../middlewares/ValidationHandler");
const requireSignin = require("../middlewares/requireSignin");
const router = Router();

router.post(
  "/profile/new",
  requireSignin,
  allowTo(roles.applicant),
  applicantNewProfileValidation,
  validate,
  applicantCtr.createApplicantProfile
);

router.get("/profile/:accountId", 
applicantCtr.getApplicantProfileByAccount);

module.exports = router;
