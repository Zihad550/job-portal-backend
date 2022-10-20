const { verify } = require('crypto');
const express = require('express');
const adminController = require('../controllers/admin.controller');
const authorization = require('../middleware/authorization');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/candidates', verifyToken, authorization('admin'), adminController.getAllCandidate);
router.get('/candidate/:id', verifyToken, authorization('admin'), adminController.getCandidateById);
router.get('/hrs', verifyToken, authorization('admin'), adminController.getAllHrs);
router.patch('/:id/make-admin', verifyToken, authorization('admin'), adminController.makeAdmin);

module.exports = router;