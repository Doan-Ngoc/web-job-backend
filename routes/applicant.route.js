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
  // applicantNewProfileValidation,
  // validate,
  uploadAvatar.single("profilePicture"),
  applicantCtr.createApplicantProfile
  // (req, res) => {console.log('form data', req.body)}
  //   try {
  //     const uploadedFile = req.file;
  //     if (!uploadedFile) {
  //       return res.status(400).json({ error: 'No file uploaded' });
  //     }
  
      // Handle other form data (if needed)
      // For example, req.body.name, req.body.email, etc.
  
  //     res.status(200).json({ message: 'File uploaded successfully', filePath: uploadedFile.path });
  //   } catch (error) {
  //     console.error('Error:', error);
  //     res.status(500).json({ error: 'File upload failed' });
  //   }
  // }
);

router.get("/profile/:accountId", 
applicantCtr.getApplicantProfileByAccount);

module.exports = router;
