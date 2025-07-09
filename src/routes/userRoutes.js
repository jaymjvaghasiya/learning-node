const router = require('express').Router();
const userController = require('../controller/userController')
const validateRequest = require('../middleware/RequestMiddleWare');
const zodMiddleware = require('../middleware/ZodMiddleWare');
const userValidationSchema = require('../validations/UserValidationSchema');

router.get('/user', userController.getUsers);
router.get('/users', userController.getAllUsers);
router.get('/finduser/:id', userController.findUserById);
router.get('/searchuser/:name', userController.searchUser);

router.get('/allusers',userController.getAllUser);
router.get('/getbyid/:id', userController.getUserById);
// router.post('/createnewuser', validateRequest, userController.createNewUser);
router.post('/createnewuser', zodMiddleware(userValidationSchema), userController.createNewUser);
router.put('/updateuser/:id', userController.updateUser);
router.delete('/deleteuser/:id', userController.deleteUser);
router.post('/login', userController.loginUser);

module.exports = router;