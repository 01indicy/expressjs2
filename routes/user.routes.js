const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const {tokenAuthentication} = require("../middleware/middleware");

router.get('/users',tokenAuthentication,userController.getAllUser)
router.post('/user',tokenAuthentication,userController.createUser)
router.get('/user/:id',tokenAuthentication,userController.getSingleUser)
router.patch('/user',tokenAuthentication,userController.updateUser)
router.delete('/user/:id',tokenAuthentication,userController.deleteUser)

module.exports = router;