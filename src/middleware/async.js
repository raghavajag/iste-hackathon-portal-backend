const { handleResponse } = require("../utils/response");
const { Response } = require("../utils/response");

function asyncHandler(handler) {
  return async (req, res, next) => {
    try {
      const handlerData = await handler(req, res, next);
      if (handlerData instanceof Response) {
        return handleResponse(handlerData, res);
      } else {
        return handlerData;
      }
    } catch (error) {
      next(error);
    }
  }
}


module.exports = asyncHandler 