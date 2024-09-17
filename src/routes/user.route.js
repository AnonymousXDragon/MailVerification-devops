const router = require('express').Router();
const userService = require('../service/user.service')
const UserController = require('../controllers/user.controller')
const { user } = require('../database/models')
const { transformDto  } = require('../middlewares/transform')
const { userLoginSchema , userRegisterSchema } = require('../dto/user.dto')

let user_service = new userService(user)
let user_controller = new UserController(user_service)

router.route('/login').post(transformDto(userLoginSchema),user_controller.loginUser.bind(user_controller))
router.route('/register').post(transformDto(userRegisterSchema),user_controller.registerUser.bind(user_controller))



module.exports = router