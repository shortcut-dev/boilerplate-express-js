require("dotenv").config();
const jwt = require("jsonwebtoken");
const moment = require("moment");

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = async (
    userId,
    expires,
    secret = process.env.SECRET_KEY
) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: Math.floor(Date.now() / 1000) + expires,
    };
    return jwt.sign(payload, secret);
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
    const accessTokenExpires = 60 * 60 * 4;
    const accessToken = await generateToken(user.user_id, accessTokenExpires);

    const refreshTokenExpires = 60 * 60 * 24;
    const refreshToken = await generateToken(user.user_id, refreshTokenExpires);

    return {
        access: {
            token: accessToken,
            expires: new Date(Date.now() + accessTokenExpires),
        },
        refresh: {
            token: refreshToken,
            expires: new Date(Date.now() + refreshTokenExpires),
        },
    };
};

module.exports = { generateAuthTokens };
