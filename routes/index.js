const { Router } = require("express");

const authenRoutes = require("./authenticate.route");
const profileRoutes = require("./profile.route");
const companyRoutes = require("./company.route");
const accountRoutes = require("./account.route");
const jobRouter = require("../routes/job.route");
const authorizeRoutes = require("./authorize.route")
const exceptionHandler = require("../middlewares/exceptionHandle");
const requireSignin = require("../middlewares/requireSignin");

const router = Router();

router.use("/job", jobRouter);
router.use("/auth", authenRoutes);

router.use(requireSignin);

router.use("/authorize", authorizeRoutes);
router.use("/account", accountRoutes);
router.use("/employee", profileRoutes);
router.use("/company", companyRoutes);

router.use(exceptionHandler);

module.exports = router;
