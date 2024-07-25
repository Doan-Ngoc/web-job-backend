const express = require("express");
const jobRouter = express.Router();
const jobController = require("../controllers/job.ctr");
const requireSignin = require("../middlewares/requireSignin");
const allowTo = require("../middlewares/allowTo");
const { roles } = require("../constants");
const createJobValidation = require('../middlewares/validations/createJob.validation')
const validate = require("../middlewares/ValidationHandler");

jobRouter.use("/search", jobController.searchJobByKeyWord);
jobRouter.post("/new", createJobValidation, validate, jobController.createNewJob);
jobRouter.get("/created", requireSignin, allowTo(roles.company), jobController.getJobListByCompany);
jobRouter.get("/applied/:accountId",  jobController.getAppliedJobList);
jobRouter.get("/applications/:jobId", requireSignin, allowTo(roles.company), jobController.getApplicationsForAJob);
jobRouter.post("/applications/status", requireSignin, allowTo(roles.company), jobController.changeApplicationStatus);
jobRouter.post("/remove/:jobId", jobController.removeJob);
jobRouter.put("/update/:jobId", jobController.updateJob);
jobRouter.get("/api/fields", jobController.getJobFields);
jobRouter.get("/:jobId", jobController.getJobById);
jobRouter.get("/", jobController.getAllJobs);

module.exports = jobRouter;
