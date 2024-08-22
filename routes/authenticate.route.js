const { Router } = require("express");
const { StatusCodes } = require('http-status-codes');
const authCtr = require("../controllers/auth.ctr");
const logupValidation = require("../middlewares/validations/signup.validation");
const loginValidation = require("../middlewares/validations/login.validation");
const validate = require("../middlewares/ValidationHandler");
const requireSignin = require("../middlewares/requireSignin");

const router = Router();

router.post("/logup", logupValidation, validate, authCtr.createUser);
router.post("/login", loginValidation, validate, authCtr.logIn);
router.post("/logout", authCtr.logOut)
router.post("/token/refresh", authCtr.createNewAccessToken)
router.get("/token/verify", requireSignin, (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Token is valid', user: req.user });
})
// router.post("/token", authCtr.refreshToken);

module.exports = router;
