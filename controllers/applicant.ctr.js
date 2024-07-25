const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("@utils/AsyncHandler");
const path = require('path');
const applicantService = require("../services/applicant.service");
const deleteUploadedFiles = require('../middlewares/deleteUploadedFile')
const JobModel = require("../models/job.model");

module.exports = {
  createApplicantProfile: asyncHandler(async (req, res) => {
    try {
      const associatedProfile = await applicantService.findProfileByAccountId(
        req.body.accountId
      );
      if (associatedProfile) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Account is already associated with a profile",
        });
      }

      const baseDirectory = path.join(__dirname, '../uploads/');
      function getRelativePath(filePath) {
        return path.relative(baseDirectory, filePath).replace(/\\/g, '/');
      }

      const defaultAvatar = path.join('profilePictures/applicantAvatars/default-avatar.jpg');
      const profilePicturePath = req.files.profilePicture ? getRelativePath(req.files.profilePicture[0].path) : defaultAvatar;
      const applicantCV = req.files.applicantCV ? getRelativePath(req.files.applicantCV[0].path) : null;

      const newAppicantProfile = await applicantService.createApplicantProfile(
        req.body, profilePicturePath, applicantCV
      );
      return res.status(StatusCodes.CREATED).json({
        newProfile: newAppicantProfile,
      });
    }
    catch (error) {
      console.error("Error uploading profile data:", error);
      deleteUploadedFiles(req)
      return res
        .status(400)
        .json({ success: false, error: "Error uploading profile data" });
    }
  }
  ),

  getApplicantProfileByAccount: asyncHandler(async (req, res) => {
    try {
      const existingApplicantProfile = await applicantService.findProfileByAccountId(
        req.params.accountId
      );
      res.json(existingApplicantProfile)
    } catch (error) {
      console.error("Error fetching profile data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }),

  downloadCV: asyncHandler(async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads/applicantCV/", filename);
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error in file download:", err);
        res.status(403).json({ message: "Invalid refresh token" });
        res.status(500).json({ message: "File not found." });
      }
    });
  }),

  sendApplication: asyncHandler(async (req, res) => {
    try {
      const applicantProfile = await applicantService.findProfileByAccountId(
        req.user.id
      )
      const hasApplied = applicantProfile.appliedJobs.some(appliedJob => appliedJob.jobId.toString() === req.params.jobId);
      if (hasApplied) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "You have already applied for this job",
        });
      }
      const appliedJob = await JobModel.findById(req.params.jobId)
      if (!appliedJob) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Job not found" });
      }
      appliedJob.applicantList.push({
        profileId: applicantProfile._id,
        applicantName: applicantProfile.name,
        applicantCV: applicantProfile.applicantCV,
        status: 'pending',
        appliedDate: Date.now()
      })
      await appliedJob.save();
      applicantProfile.appliedJobs.push({
        jobId: req.params.jobId,
        jobTitle: appliedJob.title,
        company: appliedJob.company,
        status: 'pending',
        appliedDate: Date.now()
      })
      await applicantProfile.save();
      return res.status(201).json({ status: "Application has been sent successfully!" });
    }
    catch (error) {
      console.error("Error sending application: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }),

  cancelApplication: asyncHandler(async (req, res) => {
    try {
      const applicantProfile = await applicantService.findProfileByAccountId(
        req.user.id
      )
      const appliedJob = await JobModel.findById(req.params.jobId)
      if (!appliedJob) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Job not found" });
      }
      await applicantService.deleteApplication(applicantProfile, appliedJob)
      return res.status(201).json({ status: "Application has been canceled successfully!" });
    } catch (error) {
      console.error("Error canceling application: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
};
