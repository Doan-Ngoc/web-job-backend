const { Router } = require("express");
const allowTo = require("../middlewares/allowTo");
const { roles } = require("../constants");
const applicantCtr = require("../controllers/applicant.ctr");
const applicantNewProfileValidation = require("../middlewares/validations/applicantNewProfile.validation");
const validate = require("../middlewares/ValidationHandler");
const requireSignin = require("../middlewares/requireSignin");
const router = Router();
const multer = require('multer')
const path = require('path');

//Creating storage option for profile pictures
const avatarStorage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, path.join(__dirname, '../uploads/profilePictures/applicantAvatars'));
  },
  filename: function (req, file, callback) {
      callback(null, file.originalname);
  }
})
const uploadAvatar = multer({ storage: avatarStorage})

router.post(
  "/profile/new",
  uploadAvatar.single("profilePicture"),
  applicantNewProfileValidation,
  validate,
  applicantCtr.createApplicantProfile,
);

router.get("/profile/:accountId", 
applicantCtr.getApplicantProfileByAccount);

module.exports = router;
