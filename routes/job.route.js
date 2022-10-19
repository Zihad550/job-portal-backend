const express = require('express');
const authorization = require('../middleware/authorization');
const verifyToken = require('../middleware/verifyToken');
const jobController = require('../controllers/job.controller');

const router = express.Router();

router.post('/', verifyToken, authorization('hr'), jobController.createJob);

module.exports = router;