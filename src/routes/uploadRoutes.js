const router = require('express').Router();
const uploadController = require('../controller/uploadController');

router.post('/', uploadController.uploadFile);

module.exports = router;