const Joi = require('joi');

const booksValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string(),
    author: Joi.string(),
    year: Joi.number().integer(),
    pages: Joi.number().integer(),
    status: Joi.string(),
    rating: Joi.number().integer().greater(0).less(6),
    resume: Joi.string(),
  });
  const valid = schema.validate(req.body);

  if (valid.error) {
    return res.status(400).json({
      status: valid.error,
    });
  }
  next();
};

module.exports = {
  booksValidation,
};
