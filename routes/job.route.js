const express = require('express');
const authorization = require('../middleware/authorization');
const verifyToken = require('../middleware/verifyToken');
const jobController = require('../controllers/job.controller');
const uploader = require('../middleware/uploader');

const router = express.Router();


router.route('/')
    .post( verifyToken, authorization('hr'), jobController.createJob)
    .get( jobController.getJobsForCandidate)

    router.post('/:id/apply',uploader.single('resume'), jobController.applyJob); 
    
    router.route('/:id')
    .patch( verifyToken, authorization('hr'), jobController.updateJobById)
    .get(jobController.getJobDetailWithHRInfo)
    
    
module.exports = router;