const { Router } = require("express");

const companyCtr = require("../controllers/company.ctr");
const allowTo = require("../middlewares/allowTo");
const { roles } = require("../constants");
const companyValidation = require("../middlewares/validations/company.validation");
const validate = require("../middlewares/ValidationHandler");
const requireSignin = require("../middlewares/requireSignin");

const router = Router();

router.get("/profile/:accountId",
  companyCtr.getCompanyProfileByAccount)

router.post("/profile/new", 
  requireSignin,
  allowTo(roles.company),
  companyValidation,
  validate,
  companyCtr.createCompanyProfile)

// router.post(
//   "/",
//   allowTo(roles.company),
//   companyValidations,
//   validate,
//   companyCtr.createCompany
// );

module.exports = router;
