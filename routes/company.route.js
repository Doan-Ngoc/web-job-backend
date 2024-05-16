const { Router } = require("express");

const companyCtr = require("../controllers/company.ctr");
const allowTo = require("../middlewares/allowTo");
const { roles } = require("../constants");
const companyValidation = require("../middlewares/validations/company.validation");
const validate = require("../middlewares/ValidationHandler");

const router = Router();

router.post("/profile/new", 
allowTo(roles.company),
  companyValidation,
  validate,
  companyCtr.createCompanyProfile)
router.get("/", companyCtr.getCompanyByAccount);

// router.post(
//   "/",
//   allowTo(roles.company),
//   companyValidation,
//   validate,
//   companyCtr.createCompany
// );

module.exports = router;
