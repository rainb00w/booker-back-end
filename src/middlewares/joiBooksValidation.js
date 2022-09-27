const Joi = require('joi');

const addBookValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().integer().required(),
    pages: Joi.number().integer().required(),
  });
  const valid = schema.validate(req.body);

  if (valid.error) {
    return res.status(400).json({
      status: valid.error,
    });
  }
  next();
};

const updateStatesValidation = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string().required(),
  });
  const valid = schema.validate(req.body);

  if (valid.error) {
    return res.status(400).json({
      status: valid.error,
    });
  }
  next();
};

const updateResumeValidation = (req, res, next) => {
  const schema = Joi.object({
    rating: Joi.number().integer().greater(0).less(6).required(),
    resume: Joi.string().required(),
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
  addBookValidation,
  updateStatesValidation,
  updateResumeValidation,
};
