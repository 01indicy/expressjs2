const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const middleware = require('../middleware/middleware')

router.get('/users',middleware.tokenAuthentication,userController.getAllUser)
router.post('/user',userController.createUser)
router.get('/user/:id',userController.getSingleUser)
router.patch('/user',userController.updateUser)
router.delete('/user/:id',userController.deleteUser)

module.exports = router;