const Admin = require("../../models/adminModels");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { generateTokens } = require("./utils")
const { OAuth2Client } = require("google-auth-library");
const ErrorResponse = require("../../utils/ErrorResponse");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const sendEmail = require('../../utils/sendMail');
const crypto = require('crypto');
const { Response } = require('../../utils/response');

exports.basicAuthSignUp = async (req, res, next) => {
  const { username, password, email, phone } = req.body;
  const userExists = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
  if (userExists) {
    return next(new ErrorResponse("Username already exists", 400));
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await new User({
    loginType: "BASIC_LOGIN",
    username,
    password: hashPassword,
    email,
    mobileNumber: phone,
  });
  const confirmEmailToken = user.generateEmailConfirmToken();
  // Create reset url
  const confirmEmailURL = `${req.protocol}://${process.env.host}/api/auth/confirmemail?token=${confirmEmailToken}`;
  const message = `You are receiving this email because you need to confirm your email address. Please make a GET request to: \n\n ${confirmEmailURL}`;
  await user.save({ validateBeforeSave: false });
  sendEmail({
    email: user.email,
    subject: 'Email confirmation token',
    message
  });
  const { accessToken } = await generateTokens(user.id);
  return new Response("Register Success", { token: accessToken }, 201);
}

exports.basicAuthLogIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid username or password", 400))
  }
  if (!user.isEmailVerified) {
    return next(new ErrorResponse("Please Verify your Email", 400));
  }
  const verifiedPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!verifiedPassword) {
    return next(new ErrorResponse("Invalid username or password", 400))
  }

  const { accessToken } = await generateTokens(user.id);

  return new Response("Login Success", { token: accessToken }, 200);
}

exports.googleAuth = async (req, res, next) => {
  const token = req.body.token;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  if (!ticket) {
    return next(new ErrorResponse("Invalid username or password", 400))
  }

  const { email } = ticket.getPayload();
  const isAdmin = await Admin.exists({ email });
  const user = await User.findOne({ email });

  if (!user) {
    await new User({
      loginType: "GOOGLE_LOGIN",
      email,
      role: isAdmin ? "ADMIN" : "USER",
    }).save();

    const user = await User.findOne({ email });
    const { accessToken } = await generateTokens(user.id);

    return new Response("User Created", { token: accessToken }, 201);
  }

  const { accessToken } = await generateTokens(user.id);
  return new Response("Login Success", { token: accessToken }, 200);
}
exports.confirmEmail = async function (req, res, next) {
  // grab token from email
  const { token } = req.query;

  if (!token) {
    return next(new ErrorResponse('Invalid Token', 400));
  }

  const splitToken = token.split('.')[0];
  const confirmEmailToken = crypto
    .createHash('sha256')
    .update(splitToken)
    .digest('hex');

  // get user by token
  const user = await User.findOne({
    confirmEmailToken,
    isEmailVerified: false,
  });

  if (!user) {
    return next(new ErrorResponse('Invalid Token', 400));
  }

  // update confirmed to true
  user.confirmEmailToken = undefined;
  user.isEmailVerified = true;

  // save
  user.save({ validateBeforeSave: false });

  // return token
  return new Response("Email Confirmed", undefined, 200);
}