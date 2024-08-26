const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const userService = require("../services/user.service");
const { encrypt } = require("../configs");
const tokenModel = require("../models/refreshToken.model");

module.exports = {
  //Tạo tài khoản mới
  createUser: asyncHandler(async (req, res) => {
    const user = await userService.findUserByEmail(req.body.email);
    if (user) {
      return res.status(400).json({
        field: "email",
        message: "Email already existed",
      });
    }
    const newUser = await UserModel.create(req.body);
   
    return res.status(StatusCodes.CREATED).json({
      id: newUser._id,
    });
  }),

  //Đăng nhập
  logIn: asyncHandler(async (req, res) => {
    const user = await userService.findUserByEmail(req.body.email);

    if (!user) {
      return res.status(400).json({
        success: false,
        field: "email",
        message: "Email not found",
      });
    }
    const isMatchedPassword = await user.comparePassword(
      req.body.password
    );
    if (!isMatchedPassword) {
      return res.status(400).json({
        field: "password",
        message: "Incorrect password",
      });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      encrypt.jwtSecretAccess,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      encrypt.jwtSecretRefresh,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use only in HTTPS
      sameSite: 'Strict', // Prevent CSRF
    });

    return res.status(200).json({
      user: user._id,
      accessToken,
      // refreshToken,
    });
  }),

  //Log out
  logOut: asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      // Find the user and remove the refresh token
      await UserModel.updateOne({ refreshToken }, { $unset: { refreshToken: "" } });
    }
    // Clear the cookie
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Logged out successfully' });

  }),

  //Reissue access token
  createNewAccessToken: asyncHandler(async(req, res) => {
      const { refreshToken } = req.cookies;
    console.log('refreshtoken', refreshToken)
      if (!refreshToken) return res.sendStatus(401);
    
      // Verify refresh token
      jwt.verify(refreshToken, encrypt.jwtSecretRefresh, async (err, decoded) => {
        console.log('verified success', decoded)
        if (err) return res.sendStatus(403);
    
        // Find the user
        const user = await UserModel.findOne({ _id: decoded.id, refreshToken });
        if (!user) {
          console.log('cant find user')
          return res.sendStatus(403)};
    
        // Generate new access token
        const accessToken = jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          encrypt.jwtSecretAccess,
          { expiresIn: "1h" }
        );
    
        res.json({ accessToken });
      });
    })
};
