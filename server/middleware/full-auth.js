const CustomError = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const parseToken = req => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies.token) {
    return req.cookies.token;
  }

  return null;
}

const authenticateUser = async (req, res, next) => {
  const token = parseToken(req)

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }

  try {
    const payload = isTokenValid(token);

    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };

    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
};


module.exports = { authenticateUser };
