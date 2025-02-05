const { user } = require("../models");

/**
 * Get user by email
 * @param {string} username
 * @returns {Promise<User>}
 */
const getUserByUsername = async (username) => {
    return await user.findOne({
        where: { username },
    });
};

module.exports = {
    getUserByUsername,
};
