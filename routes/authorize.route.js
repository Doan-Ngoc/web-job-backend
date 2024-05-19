const { Router } = require("express");
const { StatusCodes } = require('http-status-codes');
const router = Router();

router.get("/role", (req, res) => {
    res.status(StatusCodes.OK).json({ message: "Account's id and role", user: req.user });
})

module.exports = router;
