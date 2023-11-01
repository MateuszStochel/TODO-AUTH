const CustomError = require("../errors");
const Token = require("../models/Token");
const { isTokenValid } = require("../utils");
const { attachCookiesToResponse } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;
  let payload = null;

  try {
    if (accessToken) {
      payload = isTokenValid(accessToken);
    }

    if (refreshToken) {
      payload = isTokenValid(refreshToken);

      const existingToken = await Token.findOne({
        user: payload.user.userId,
        refreshToken: payload.refreshToken,
      });

      if (!existingToken || !existingToken?.isValid) {
        throw new CustomError.UnauthenticatedError("Authentication Invalid");
      }

      attachCookiesToResponse({
        res,
        user: payload.user,
        refreshToken: existingToken.refreshToken,
      });
    }
    if (!payload) {
      throw new CustomError.UnauthenticatedError("No valid tokens provided");
    }

    req.user = payload.user;
    next();

  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = {
  authenticateUser,
};
