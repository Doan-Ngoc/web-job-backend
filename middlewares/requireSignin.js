/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { encrypt } = require('@configs');

module.exports = (req, res, next) => {
  let token;
  if (
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  try {
    const decodedToken = jwt.verify(token, encrypt.jwtSecret);
    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, msg: 'Invalid token' });
  }
};
