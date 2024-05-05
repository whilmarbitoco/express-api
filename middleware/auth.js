const jwt = require("jsonwebtoken")
const db = require("../models")

async function authenticate(req, res, next) {
    const token = req.headers.auth
    if (!token) {
        res.status(401).json({auth: false, error: "Token not found"})
    }
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err) res.status(404).json({auth: false, error: err})

        const user = await db.User.findOne({where: {uuid: decoded.id}})

        if (!user) {
            res.status(401).json({auth: false, error: "Token not found"})
        }
        next()
    })

}

module.exports = authenticate