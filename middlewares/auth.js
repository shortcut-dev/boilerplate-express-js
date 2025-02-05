const passport = require("../config/passport");

const private = passport.authenticate("jwt", {
    session: false,
});

module.exports = { private };
