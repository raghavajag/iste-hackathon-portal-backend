const User = require('../../models/userModel')
const { Response } = require('../../utils/response')

exports.getDetails = async (req, res, next) => {
  const user = await User.findById(
    { _id: req.user._id },
    { password: 0, __v: 0 }
  )
  return new Response('User Details', user, 200)
}