const { Router } = require("express");
const allowTo = require("../middlewares/allowTo");
const { roles } = require("../constants");
const applicantCtr = require("../controllers/applicant.ctr");
const applicantNewProfileValidation = require("../middlewares/validations/applicantNewProfile.validation");
const validate = require("../middlewares/ValidationHandler");
const requireSignin = require("../middlewares/requireSignin");
const router = Router();
const {uploadAplicantAvatar, uploadApplicantCV, upload } = require("../middlewares/fileUploads")
const multer = require('multer');
const path = require('path');

router.post(
  "/profile/new",
  upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'applicantCV', maxCount: 1 }
  ]),
  applicantNewProfileValidation,
  validate,
  applicantCtr.createApplicantProfile,
);

router.get("/profile/:accountId", 
applicantCtr.getApplicantProfileByAccount);

router.get("/download/applicantCV/:filename", applicantCtr.downloadCV)

router.patch("/apply/:jobId", 
  requireSignin, 
  allowTo(roles.applicant),
  applicantCtr.sendApplication
)

router.post("/cancel/:jobId", 
  requireSignin, 
  allowTo(roles.applicant),
  applicantCtr.cancelApplication)


module.exports = router;
