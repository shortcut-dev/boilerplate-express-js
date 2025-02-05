const userService = require("./userService");

/**
 * Login with username and password
 * @param {string} username
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithUsernameAndPassword = async (username, password) => {
    const user = await userService.getUserByUsername(username);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new Error(401, "Incorrect email or password");
    }
    return user;
};

module.exports = {
    loginUserWithUsernameAndPassword,
};
