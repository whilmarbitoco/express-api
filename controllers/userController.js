const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models")

async function index(req, res) {
    const users = await db.User.findAll()
   
    res.send(users)
}

async function login(req, res) {
    const { username, password } = req.body
  
    const user = await db.User.findOne({ where: { username } })
  
    if (!user) return res.status(404).json({ auth: false, error: "User Not Found" })
    
  
    const compare = await bcrypt.compare(password, user.password)
  
    if (!compare) return res.status(401).json({ auth: false, error: "Username or Password not match" })
  
    const jwtToken = jwt.sign({ id: user.uuid, username: user.username }, process.env['JWT_TOKEN'])
  
    res.status(200).json({ auth: true, user: user, token: jwtToken })
  }
  
  async function signup(req, res) {
    const { username, password } = req.body;
  
    const user = await db.User.findOne({ where: { username } })
  
    if (user) return res.status(403).json({ error: "User Already exists" })
    
  
    const hashed = await bcrypt.hash(password, 10)
  
    await db.User.create({ username, password: hashed })
  
    res.status(201).json({ message: "Account successfully created" })
  }
  

async function deleteUser(req, res) {
    const { id } = req.params
    const user = await db.User.findOne({ where: { id: id } })
  
    if (!user) return res.status(404).json({ error: "User Not Found" })
  
    await user.destroy()
  
    res.status(200).json({ message: "User Deleted" })
  
}


async function verify(req, res) {
    const token = req.headers.auth
    if (!token) return res.status(401).json({valid: false})

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err) return res.status(401).json({valid: false})

        const user = await db.User.findOne({where: {uuid: decoded.id}})
    
        if (!user) return res.status(401).json({valid: false})
          
        res.status(200).json({valid: true})
            
        
    })
 
    
}

module.exports = {
    index,
    login,
    signup,
    verify,
    deleteUser
}