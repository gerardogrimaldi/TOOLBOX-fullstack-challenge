const express = require('express');
const filesController = require('../controllers/filesController');

const router = express.Router();

router.get('/data', filesController.getFilesData);

router.get('/list', filesController.getFilesList);

module.exports = router;