const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')

router.get('/users',userController.getAllUser)
router.post('/user',userController.createUser)
router.get('/user/:id',userController.getSingleUser)
router.patch('/user',userController.updateUser)
router.delete('/user/:id',userController.deleteUser)

module.exports = router;