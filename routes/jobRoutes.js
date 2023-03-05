import express from "express";
const router = express.Router()

import { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controllers/jobController.js'

router.route('/').get(getAllJobs).post(createJob)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router