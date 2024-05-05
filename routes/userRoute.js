const router = require("express").Router()
const { login, signup, index } = require('../controllers/userController')
const authenticate = require("../middleware/auth")

router.get("/", authenticate, index)
router.post("/login", login)
router.post("/signup", signup)

module.exports = router
