const { StatusCodes } = require('http-status-codes');
const crypto = require('crypto');

const User = require('../models/User');
const Token = require('../models/Token');
const CustomError = require('../errors');
const {
  attachCookiesToResponse,
  createTokenUser
} = require('../utils');


const register = async (req, res) => {
  const { email, name, password } = req.body;
  const [emailAlreadyExists, isFirstAccount] = await Promise.all([
    User.findOne({ email }),
    User.countDocuments({}) === 0,
  ]);

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  const role = isFirstAccount ? 'admin' : 'user';

  const verificationToken = crypto.randomBytes(40).toString('hex');

  await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Your account has been created',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const tokenUser = createTokenUser(user);
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid, refreshToken } = existingToken;

    if (!isValid) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    return res.status(StatusCodes.OK).json({ user: tokenUser });
  }

  const refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now()), // Expire the cookie immediately
  };

  res.cookie('accessToken', 'logout', cookieOptions);
  res.cookie('refreshToken', 'logout', cookieOptions);

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  logout,
};
