module.exports = {
  body: function (schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((errorDetail) => ({
          field: errorDetail.path.join("."),
          message: errorDetail.message,
        }));

        return res.status(400).json({
          errors,
          success: false,
        });
      }
      return next();
    };
  },
  params: function (schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.params, { abortEarly: false });
      if (error) {
        const errors = error.details.map((errorDetail) => ({
          field: errorDetail.path.join("."),
          message: errorDetail.message,
        }));

        return res.status(400).json({
          errors,
          success: false,
        });
      }
      return next();
    };
  },
}