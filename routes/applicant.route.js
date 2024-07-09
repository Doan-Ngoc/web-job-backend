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

router.get("/download/applicantCV/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads/applicantCV/", filename);
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error in file download:", err);
      res.status(403).json({ message: "Invalid refresh token" });
      res.status(500).json({ message: "File not found."});
    }
  });
})

module.exports = router;
