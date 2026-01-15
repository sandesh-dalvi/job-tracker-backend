import express from "express";
import demoUser from "../middleware/demo-user.js";

import {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobs.controller.js";

const router = express.Router();

router.route("/").post(demoUser, createJob).get(getAllJobs);

router.route("/stats").get(showStats);

router
  .route(":/id")
  .get(getJob)
  .delete(demoUser, deleteJob)
  .patch(demoUser, updateJob);

export default router;
