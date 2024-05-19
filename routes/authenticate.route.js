const { Router } = require("express");
const { StatusCodes } = require('http-status-codes');

const authCtr = require("../controllers/auth.ctr");
const signupValidation = require("../middlewares/validations/signup.validation");
const loginValidation = require("../middlewares/validations/login.validation");
const validate = require("../middlewares/ValidationHandler");
const requireSignin = require("../middlewares/requireSignin")

const router = Router();

router.post("/signup", signupValidation, validate, authCtr.createUser);
router.post("/signin", loginValidation, validate, authCtr.login);
router.get("/token/verify", requireSignin, (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Token is valid', user: req.user });
})
router.post("/token", authCtr.refreshToken);

module.exports = router;
