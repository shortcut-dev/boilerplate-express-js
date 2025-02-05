const { authService, tokenService } = require("../services");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await authService.loginUserWithUsernameAndPassword(
            username,
            password
        );
        const token = await tokenService.generateAuthTokens(user);

        user.password = "Hidden Content";

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(401).send("Unauthorized");
    }
};

module.exports = {
    login,
};
