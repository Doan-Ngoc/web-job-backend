const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const constants = require("../constants");

module.exports = (roles) => (req, res, next) => {
  console.log(roles)
  console.log(req.user.role)
  if (
    !req.user.role ||
    !roles.includes(req.user.role)
  ) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "You do not have permission to access the resource",
    });
  }
  return next();
};
