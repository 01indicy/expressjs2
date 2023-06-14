const { User } = require('../models/')
const {where} = require("sequelize");

exports.getAllUser = async (req,res) => {
    await User.findAll().then(userList => res.status(200).json({userList})).catch(e => {
        console.log(e.message)
        res.status(500).json({error:'Internal server error'})
    })
}

exports.createUser = async (req,res) => {
    try {
        const { name, email } = req.body
        if(!name || !email) return res.status(400).json({ error: 'Name and email are required fields' });

        await User.findOne({where:{email: email}}).then(async findResponse => {
            if (findResponse === null) {
                await User.create({name: name, email: email}).then((response) => {
                    res.status(201).json({response})
                }).catch((error) => res.status(500).json(error.message))
            }else{
                res.status(409).json({error:"error",msg:"user already exists"})
            }
        })
    }catch (e) {
        console.log(e.message)
        res.status(500).json({error:'Internal server error'})
    }
}

exports.getSingleUser = async (req,res) => {
    try {
        const userID = req.params.id

        await User.findOne({where : {id:userID}}).then(userList => {
            if (userList === null) {
                res.status(409).json({error:"error",msg:`user with id ${userID} not found`})
            }else{
                res.status(200).json({userList})
            }
        }).catch(error => res.status(500).json(error.message))
    }catch (error) {
        res.status(500).json(error.message)
    }
}

exports.updateUser = async (req,res) => {
    try {
        const {name,email,id} = req.body
        if(!name || !email || !id) return res.status(400).json({ error: 'Name, email or id are required fields' });

        await User.findOne({where: {id: id}}).then(async userDetails => {
            if (userDetails === null) {
                res.status(409).json({error: "error", msg: `user with id ${id} not found`})
            } else {
                await User.update({name:name,email:email}, {where: {id:id}}).then(updateResponse => {
                    res.status(200).json(req.body)
                }).catch(error => res.status(500).json(error.message))
            }
        })
    }catch (error) {
        res.status(500).json(error.message)
    }
}

exports.deleteUser = async (req,res) => {
    try{
        const userID = req.params.id
        await User.findOne({where : {"id":userID}}).then(async userList => {
            if (userList === null) {
                res.status(409).json({error:"error",msg:`user with id ${userID} not found`})
            }else{
                await User.destroy({where:{id:userID}}).then(deleteUserResponse => {
                    if(deleteUserResponse > 0) {
                        res.status(200).json({msg:`user with id ${userID} is deleted successful`})
                    }
                }).catch(error => res.status(500).json(error.message))
            }
        }).catch(error => res.status(500).json(error.message))
    }catch (error) {
        res.status(500).json(error.message)
    }
}