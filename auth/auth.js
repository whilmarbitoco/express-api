const passport = require("passport")
const passportJWT = require("passport-jwt")

const ExtractJwt = passportJWT.ExtractJwt
const StrategyJwt = passportJWT.Strategy
const db = require("../models")

// Define authFunc before using it
const authFunc = (jwtPayload, done) => {
    return db.User.findOne({ where: { uuid: jwtPayload.id } })
        .then((user) => {
            return done(null, user)
        })
        .catch((err) => {
            done(err)
        })
}

passport.use(new StrategyJwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, authFunc))
