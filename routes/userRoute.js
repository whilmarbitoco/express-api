const router = require("express").Router()
const { login, signup, index, verify } = require('../controllers/userController')
const authenticate = require("../middleware/auth")

router.get("/", authenticate, index)
router.post("/login", login)
router.post("/signup", signup)
router.post("/verify", verify)

module.exports = router
