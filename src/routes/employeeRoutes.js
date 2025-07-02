const router = require('express').Router();
const empController = require('../controller/employeeController');

router.get('/', empController.getAll);
router.get('/:id', empController.getById);
router.post('/', empController.createUser);
router.put('/:id', empController.updateUser);
router.delete('/:id', empController.deleteUser);

module.exports = router;