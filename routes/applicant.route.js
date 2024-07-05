const { Router } = require("express");
const allowTo = require("../middlewares/allowTo");
const { roles } = require("../constants");
const applicantCtr = require("../controllers/applicant.ctr");
const applicantNewProfileValidation = require("../middlewares/validations/applicantNewProfile.validation");
const validate = require("../middlewares/ValidationHandler");
const requireSignin = require("../middlewares/requireSignin");
const router = Router();
const {uploadAplicantAvatar, uploadApplicantCV, logRequest, upload } = require("../middlewares/fileUploads")
const multer = require('multer');
const path = require('path');

//Creating storage option for profile pictures
const avatarStorage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, path.join(__dirname, '../uploads/profilePictures/applicantAvatars'));
  },
//   //Extracts the file extension from the original filename to ensure that the uploaded file retains its original file type
//   // filename: function (req, file, callback) {
//   //   const accountId = req.body.accountId; 
//   //   const fileExtension = path.extname(file.originalname);
//   //   callback(null, 'photo_' + accountId + fileExtension);
  filename: function (req, file, callback) {
      callback(null, file.originalname);  
  }
})
const uploadAvatar = multer({ storage: avatarStorage})

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

// router.post(
//   "/profile/new", 
//   uploadAvatar.single("profilePicture"),
//   (req, res) => {
//     console.log('File uploaded:', req.file);
//     res.send('File uploaded successfully');
//   }
// );

router.get("/profile/:accountId", 
applicantCtr.getApplicantProfileByAccount);

module.exports = router;
