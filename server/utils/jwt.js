const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => jwt.sign(payload, process.env.JWT_SECRET);
const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  signed: true,
};

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  res.cookie('accessToken', accessTokenJWT, {
    ...cookieOptions,
    expires: new Date(Date.now() + oneDay),
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    ...cookieOptions,
    expires: new Date(Date.now() + longerExp),
  });
};


module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
