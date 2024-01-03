const ErrorResponse = require('../utils/ErrorResponse');
const { handleResponse, Response } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  try {
    console.log(err);
    const response = new Response();
    response.status = 500;
    response.success = false;
    if (err.name === 'CastError') {
      response.status = 404;
      response.message = 'Resource not found';
    }
    else if (err.code === 11000) {
      response.status = 400;
      response.message = 'Duplicate field value entered';
    }
    else if (err.name === 'ValidationError') {
      response.status = 400;
      response.message = Object.values(err.errors).map(val => val.message);
    }
    else if (err instanceof ErrorResponse) {
      response.status = err.status;
      response.message = err.message;
    }
    else {
      response.message = "Internal Server Error";
    }
    return handleResponse(response, res)
  } catch (error) {
    console.log(error);
  }
  return handleResponse(
    new Response(
      "Something went really wrong, please contact support.",
      undefined,
      500
    ),
    res
  )
};

module.exports = errorHandler;