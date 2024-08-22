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

  //Refresh token
  // refreshToken: asyncHandler(async (req, res) => {
  //   const { refreshToken } = req.body;

  //   if (!refreshToken) {
  //     return res.status(401).json({ message: "Refresh token not found" });
  //   }

  //   try {
  //     const decoded = jwt.verify(refreshToken, encrypt.jwtSecretRefresh);

  //     const userRefreshToken = await tokenModel.findOne({
  //       user: decoded.id,
  //       token: refreshToken,
  //     });

  //     if (userRefreshToken) {
  //       return res.status(403).json({ message: "Expired refresh token" });
  //     }

  //     const expiredToken = new tokenModel({
  //       user: decoded.id,
  //       token: refreshToken,
  //     });

  //     await expiredToken.save();

  //     const user = await userService.findUserById(decoded.id);

  //     const newRefreshToken = jwt.sign(
  //       { id: decoded.id },
  //       encrypt.jwtSecretRefresh
  //     );

  //     const accessToken = jwt.sign(
  //       {
  //         id: user._id,
  //         role: user.role,
  //       },
  //       encrypt.jwtSecretAccess,
  //       { expiresIn: "1h" }
  //     );

  //     return res.status(201).json({
  //       user: decoded.id,
  //       accessToken,
  //       refreshToken: newRefreshToken,
  //     });
  //   } catch (err) {
  //     return res.status(403).json({ message: "Invalid refresh token" });
  //   }
  // }),

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
    
      if (!refreshToken) return res.sendStatus(401);
    
      // Verify refresh token
      jwt.verify(refreshToken, encrypt.jwtSecretRefresh, async (err, decoded) => {
        if (err) return res.sendStatus(403);
    
        // Find the user
        const user = await UserModel.findOne({ _id: decoded.userId, refreshToken });
        if (!user) return res.sendStatus(403);
    
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
