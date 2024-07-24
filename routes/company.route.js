const { Router } = require("express");

const companyCtr = require("../controllers/company.ctr");
const allowTo = require("../middlewares/allowTo");
const { roles } = require("../constants");
const companyValidation = require("../middlewares/validations/companyNewProfile.validation");
const validate = require("../middlewares/ValidationHandler");
const requireSignin = require("../middlewares/requireSignin");
const {upload } = require("../middlewares/fileUploads")

const router = Router();

router.get("/profile/:accountId",
  companyCtr.getCompanyProfileByAccount)

  router.post(
    "/profile/new",
    upload.single("companyLogo"),
    
    (req, res, next) => {
      if (req.file) {
        console.log('Logo uploaded successfully:', req.file);
        console.log('array', req.body)
      } else {
        console.log('No logo uploaded.', req.body);
      }
      next();
    },

    companyValidation,
    validate,
    companyCtr.createCompanyProfile
  );  

module.exports = router;
