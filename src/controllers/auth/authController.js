const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { generateTokens } = require("./utils")

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
      message: "Account created sucessfully",
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
    message: "Logged in sucessfully",
    accessToken,
  });
} 