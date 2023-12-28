const Admin = require("../../models/adminModels");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { generateTokens } = require("./utils")
const { OAuth2Client } = require("google-auth-library");
const ErrorResponse = require("../../utils/ErrorResponse");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.basicAuthSignUp = async (req, res, next) => {
  const { username, password, email, phone } = req.body;
  const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
  if (user) {
    return next(new ErrorResponse("Username already exists", 400));
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  await new User({
    loginType: "BASIC_LOGIN",
    username,
    password: hashPassword,
    email,
    mobileNumber: phone,
  }).save();

  const savedUser = await User.findOne({ username: req.body.username });
  const { accessToken } = await generateTokens(savedUser.id);
  return res.status(201).json({
    message: "Account created successfully",
    accessToken,
  });
}

exports.basicAuthLogIn = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid username or password", 400))
  }

  const verifiedPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!verifiedPassword) {
    return next(new ErrorResponse("Invalid username or password", 400))
  }

  const { accessToken } = await generateTokens(user.id);

  return res.status(200).json({
    message: "Logged in sucessfully", accessToken,
  });
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

    return res.status(201).json({
      message: "User Login Sucessfull",
      accessToken,
    });
  }

  const { accessToken } = await generateTokens(user.id);
  return res.status(200).json({
    message: "Logged in sucessfully",
    accessToken,
  });
}