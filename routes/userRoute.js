const router = require("express").Router()
const passport = require("passport")
const { login, signup, index } = require('../controllers/userController')
require("../auth/auth")

const authenticate = passport.authenticate("jwt", { session: false })

router.get("/", authenticate,index)
router.post("/login", login)
router.post("/signup", signup)

module.exports = router
