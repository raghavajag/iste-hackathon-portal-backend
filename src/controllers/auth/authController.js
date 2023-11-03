const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { generateTokens } = require("./utils")
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.basicAuthSignUp = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.json({ success: false, message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({
      loginType: "BASIC_LOGIN",
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
      hasFilledDetails: false,
      firstName: null,
      lastName: null,
      mobileNumber: null,
      regNo: null,
    }).save();

    const savedUser = await User.findOne({ username: req.body.username });
    const { accessToken } = await generateTokens(savedUser);
    res.status(201).json({
      message: "Account created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong." })
  }
}

exports.basicAuthLogIn = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.json({ success: false, message: "Invalid username or password" })
  }

  const verifiedPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!verifiedPassword) {
    return res.json({ success: false, message: "Invalid username or password" })
  }

  const { accessToken } = await generateTokens(user);

  res.status(200).json({
    message: "Logged in sucessfully", accessToken,
  });
}

exports.googleAuth = async (req, res, next) => {
  const token = req.body.token;
  const emailFromClient = req.body.email;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  if (!ticket) {
    return res.json({ success: false, message: "Invalid username or password" })
  }

  const { email } = ticket.getPayload();
  if (email !== emailFromClient) {
    return res.json({ success: false, message: "Invalid username or password" })
  }

  const user = await User.findOne({ email: emailFromClient });

  if (!user) {
    await new User({
      loginType: "GOOGLE_LOGIN",
      email: emailFromClient,
    }).save();

    const user = await User.findOne({ email: emailFromClient });
    const { accessToken } = await generateTokens(user);

    return res.status(201).json({
      message: "User Login Sucessfull",
      accessToken,
    });
  }
  const { accessToken } = await generateTokens(user);
  res.status(200).json({
    message: "Logged in sucessfully",
    accessToken,
  });
}