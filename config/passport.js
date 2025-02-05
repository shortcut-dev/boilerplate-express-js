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
        try {
            if (payload.exp < Date.now()) {
                done(null, false);
            }
            user.findOne({
                where: { user_id: payload.sub },
                attributes: { exclude: ["password"] },
            })
                .then((userLog) => {
                    console.log(userLog);
                    done(null, userLog);
                })
                .catch((err) => {
                    done(err, false);
                });
        } catch (error) {
            done(error.message, false);
        }
    })
);

module.exports = passport;
