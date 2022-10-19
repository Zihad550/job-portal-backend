const express = require('express');
const jobController = require('../controllers/job.controller');
const authorization = require('../middleware/authorization');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/jobs',verifyToken, authorization('hr'), jobController.getJobsForManager);

router.get('/jobs/:id',verifyToken, authorization('hr'), jobController.getJobByIdForHR);

module.exports = router;