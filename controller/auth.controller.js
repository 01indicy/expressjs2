const { User } = require('../models/')
const bcrypt = require("bcrypt");

exports.login = async (req,res) => {
    const {email,password} = req.body
    if(!email || !password ) return res.status(400).json({ error: 'Email and password are required fields' });

    await User.findOne({where: {email:email}}).then(async response => {
        if(response === null) return res.status(409).json({ error: 'Invalid email' })
        const [result] = await Promise.all([bcrypt.compare(password,response['dataValues']['password'])]);

        if(result){
            const accessToken = await createAccessToken(response['dataValues']['email'],response['dataValues']['createdAt']);
            res.status(200).json({accessToken:accessToken,user:response['dataValues']})
        }else{
            res.status(409).json({status:"error",msg:"Invalid Password"})
        }
    })
}

async function createAccessToken(email, createdAt) {
    return  require('jsonwebtoken').sign('#'+email+new Date()+createdAt+new Date(), process.env.JWT_SECRET_TOKEN, {})
}