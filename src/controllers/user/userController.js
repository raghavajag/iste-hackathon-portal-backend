const User = require('../../models/userModel')

exports.getDetails = async (req, res, next) => {
  try {
    const user = await User.findById(
      { _id: req.user._id },
      { password: 0, __v: 0 }
    )
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
}