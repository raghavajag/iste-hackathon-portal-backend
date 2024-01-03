const { handleResponse } = require("../utils/response");

function asyncHandler(handler) {
  return async (req, res, next) => {
    try {
      const handlerData = await handler(req, res, next);
      return handleResponse(handlerData, res);
    }
    catch (error) {
      next(error)
    }
  }
}


module.exports = asyncHandler 