const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models")

async function index(req, res) {
    const users = await db.User.findAll()
   
    res.send(users)
}

async function login(req, res) {
    const {username, password} = req.body
    
    const user = await db.User.findOne({where: {username}})

    if (!user) {
        res.status(404).json({auth: false, error: "User Not Found"})
    }

    try {
        const compare = await bcrypt.compare(password, user.password)

        if (!compare) {
            res.status(401).json({auth: false, error: "Username or Password not match"})
        }

        const jwtToken = jwt.sign({id: user.uuid, username: user.username},process.env.JWT_SECRET)

        res.status(200).json({auth: true, user: user, token: jwtToken})
    } catch (err) {
        res.json({auth: false, error: err})
    }

}

async function signup(req, res) {
    const { username, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { username } });

        if (user) {
            return res.status(403).json({ error: "User Already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        await db.User.create({ username, password: hashed });

        res.status(201).json({ message: "Account successfully created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = {
    index,
    login,
    signup
}