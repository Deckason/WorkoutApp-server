const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next)=>{
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({error: "Authorization Failed"})
    }

    const token = authorization.split(" ")[1]
    
    try {
        const {id} = jwt.verify(token, process.env.SECRETE)
        req.user = await User.findOne({id}).select("_id")._conditions
        next()
    } catch (error) {
        res.status(401).json({error: "Request not Authorized"})
    }

}

module.exports = requireAuth