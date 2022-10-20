const express = require('express');
const authorization = require('../middleware/authorization');
const verifyToken = require('../middleware/verifyToken');
const jobController = require('../controllers/job.controller');

const router = express.Router();

router.route('/')
    .post( verifyToken, authorization('hr'), jobController.createJob)
    .get( jobController.getJobsForCandidate)

    
    router.route(':id')
    .put( verifyToken, authorization('hr'), jobController.updateJobById)
    .get(jobController.getJobDetailWithHRInfo)
    
    router.patch('/:id/apply', jobController.applyJob);
module.exports = router;