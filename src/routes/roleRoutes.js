const router = require('express').Router();
const roleController = require("../controller/roleConstoller");

router.post('/', roleController.createRole);
router.get('/', roleController.getAllRoles);

module.exports = router