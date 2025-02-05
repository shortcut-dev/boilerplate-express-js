const { z } = require("zod");

const validateLogin = z.object({
    username: z.string(),
    password: z.string(),
});

module.exports = { validateLogin };
