const express = require("express");
const jobRouter = express.Router();
const jobController = require("../controllers/job.ctr");

jobRouter.use("/search", jobController.searchJobByKeyWord);
jobRouter.post("/new", jobController.createNewJob);
jobRouter.post("/created", jobController.getJobListByCompany);
jobRouter.post("/remove/:jobId", jobController.removeJob);
jobRouter.put("/update/:jobId", jobController.updateJob);
jobRouter.get("/api/fields", jobController.getJobFields);
jobRouter.get("/:jobId", jobController.getJobById);
jobRouter.get("/", jobController.getAllJobs);

module.exports = jobRouter;
