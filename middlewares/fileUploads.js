const multer = require('multer');
const path = require('path');

// Creating storage option for profile pictures
// const applicantAvatar = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, path.join(__dirname, '../uploads/profilePictures/applicantAvatars'));
//   },
// //Extracts the file extension from the original filename 
//   filename: function (req, file, callback) {
//     const accountId = req.body.accountId;
//     const fileExtension = path.extname(file.originalname);
//     callback(null, 'photo_' + accountId + fileExtension);
//   }
// });

// const uploadAplicantAvatar = multer({ storage: applicantAvatar });

// // Creating storage option for other files (example)
// const applicantCV = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, path.join(__dirname, '../uploads/applicantCV'));
//   },
//   filename: function (req, file, callback) {
//     const accountId = req.body.accountId;
//     const fileExtension = path.extname(file.originalname);
//     callback(null, 'cv_' + accountId + fileExtension);
//   }
// });

// const uploadApplicantCV = multer({ storage: applicantCV });

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      let destinationPath = ''; 
      
      // Determine destination based on file type
      if (file.fieldname === 'profilePicture') {
        destinationPath = path.join(__dirname, '../uploads/profilePictures/applicantAvatars');
      } else if (file.fieldname === 'applicantCV') {
        destinationPath = path.join(__dirname, '../uploads/applicantCV');
      }
      else if (file.fieldname === 'companyLogo') {
        destinationPath = path.join(__dirname, '../uploads/profilePictures/companyLogos');
      } 
      callback(null, destinationPath);
    },
    filename: function (req, file, callback) {
      // const accountId = req.body.accountId;
      // const fileExtension = path.extname(file.originalname);
      // Customize filename based on the field name and original filename
      // let filenamePrefix = '';
      // if (file.fieldname === 'profilePicture') {
      //   filenamePrefix = 'photo_';
      // } else if (file.fieldname === 'applicantCV') {
      //   filenamePrefix = 'cv_';
      // } 
      // callback(null, filenamePrefix + accountId + fileExtension);
      callback(null, file.originalname);
    }
  });

  const upload = multer({ storage: storage });


module.exports = {
  upload
};
