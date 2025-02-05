require("dotenv").config();

const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { user } = require("../models");

// Passport JTW options
const options = {
    // Extract jwt dari request
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    // Harus sama di model User
    secretOrKey: process.env.SECRET_KEY,
};

passport.use(
    new JwtStrategy(options, async (payload, done) => {
        if (payload.exp < Date.now()) {
            return done(null, false);
        }
        await user
            .findOne({
                where: { user_id: payload.sub },
                attributes: { exclude: ["password"] },
            })
            .then((userLog) => {
                done(null, userLog);
            })
            .catch((err) => {
                done(err, false);
            });
    })
);

module.exports = passport;
