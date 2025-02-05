var express = require("express");
const { private: restrict } = require("../middlewares/auth");
const { authController } = require("../controller");
const { validate } = require("../middlewares/validate");
const { validateLogin } = require("../utils/validateInput");
var router = express.Router();

/* GET users listing. */
router.get("/whoami", restrict, (req, res, next) => {
    res.json(req.user);
});

router.post("/login", validate(validateLogin), authController.login);

module.exports = router;
