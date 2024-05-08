const jwt = require("jsonwebtoken")
const db = require("../models")

async function authenticate(req, res, next) {
    
    const token = req.headers.auth
   
    if (!token) return res.status(401).json({auth: false, error: "Token not found"})

    jwt.verify(token, process.env['JWT_TOKEN'], async (err, decoded) => {
        if(err) return res.status(404).json({auth: false, error: "Invalid Token Signature"})

        const user = await db.User.findOne({where: {uuid: decoded.id}})
    
        if (!user) return res.status(401).json({auth: false, error: "Invalid Token"})
        
        next()
       
    })

}

module.exports = authenticate