const { Router } = require("express");
const { StatusCodes } = require('http-status-codes');

const authCtr = require("../controllers/auth.ctr");
const userValidation = require("../middlewares/validations/user.validation");
const loginValidation = require("../middlewares/validations/login.validation");
const validate = require("../middlewares/ValidationHandler");
const requireSignin = require("../middlewares/requireSignin")

const router = Router();

router.post("/signup", userValidation, validate, authCtr.createUser);
router.post("/signin", loginValidation, validate, authCtr.login);
router.get("/token/verify", requireSignin, (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Token is valid', user: req.user });
})
router.post("/token", authCtr.refreshToken);

module.exports = router;
