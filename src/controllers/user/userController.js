const User = require('../../models/userModel')
const { Response } = require('../../utils/response')
const Teams = require('../../models/teamsModel')

exports.getDetails = async (req, res, next) => {
  const user = await User.findById(
    { _id: req.user._id },
    {
      password: 0, __v: 0, createdAt: 0, updatedAt: 0, date: 0,
      isEmailVerified: 0, hasFilledDetails: 0, loginType: 0, role: 0
    }
  )
  const team = await Teams.findOne({ members: user._id }, { __v: 0, createdAt: 0, updatedAt: 0, referralCode: 0 });

  const responseData = {
    user,
    team,
  };

  return new Response('User Details', responseData, 200)
}