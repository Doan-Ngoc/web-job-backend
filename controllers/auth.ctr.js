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
    const userWithEmail = await userService.findUserByEmail(req.body.email);
    if (userWithEmail) {
      return res.status(400).json({
        field: "email",
        message: "Email already exists",
      });
    }
    const newUser = await UserModel.create(req.body);
    return res.status(StatusCodes.CREATED).json({
      id: newUser._id,
    });
  }),

  //Đăng nhập
  login: asyncHandler(async (req, res) => {
    const userWithEmail = await userService.findUserByEmail(req.body.email);

    if (!userWithEmail) {
      return res.status(400).json({
        success: false,
        field: "email",
        message: "Email not found",
      });
    }
    const isMatchedPassword = await userWithEmail.comparePassword(
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
        id: userWithEmail._id,
        role: userWithEmail.role,
      },
      encrypt.jwtSecretAccess,
      { expiresIn: "1h" }
    );
    // const refreshToken = jwt.sign(
    //   { id: userWithEmail._id },
    //   encrypt.jwtSecretRefresh
    // );

    return res.status(200).json({
      user: userWithEmail._id,
      accessToken,
      // refreshToken,
    });
  }),

  //Refresh token
  refreshToken: asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    try {
      const decoded = jwt.verify(refreshToken, encrypt.jwtSecretRefresh);

      const userRefreshToken = await tokenModel.findOne({
        user: decoded.id,
        token: refreshToken,
      });

      if (userRefreshToken) {
        return res.status(403).json({ message: "Expired refresh token" });
      }

      const expiredToken = new tokenModel({
        user: decoded.id,
        token: refreshToken,
      });

      await expiredToken.save();

      const user = await userService.findUserById(decoded.id);

      const newRefreshToken = jwt.sign(
        { id: decoded.id },
        encrypt.jwtSecretRefresh
      );

      const accessToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        encrypt.jwtSecretAccess,
        { expiresIn: "1h" }
      );

      return res.status(201).json({
        user: decoded.id,
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
  }),
};
