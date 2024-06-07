const { Router } = require("express");
const authenRoutes = require("./authenticate.route");
const applicantRoutes = require("./applicant.route");
const companyRoutes = require("./company.route");
const accountRoutes = require("./account.route");
const jobRoutes = require("../routes/job.route");
const authorizeRoutes = require("./authorize.route")
const exceptionHandler = require("../middlewares/exceptionHandle");
const requireSignin = require("../middlewares/requireSignin");

const router = Router();

router.use("/job", jobRoutes);
router.use("/auth", authenRoutes);
router.use("/company", companyRoutes);
router.use("/applicant", applicantRoutes);
router.use(requireSignin);

router.use("/authorize", authorizeRoutes);
router.use("/account", accountRoutes);



router.use(exceptionHandler);

module.exports = router;
