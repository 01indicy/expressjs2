exports.tokenAuthentication = async (req,res,next) => {
    if (req.headers.authorization !== undefined){
        if (req.headers.authorization.split(" ")[1]) {
            const token = req.headers.authorization.split(" ")[1];
            console.log(token)
            next()
        }
    }else{
        res.status(400).json({msg:'Please provide token'})
    }
}