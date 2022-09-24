const Joi = require('joi');

const addUserValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string()
      .min(3)
      .max(15)
      // eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
  });
  const valid = schema.validate(req.body);

  if (valid.error) {
    return res.status(400).json({
      status: valid.error.details,
    });
  }
  next();
};

const ChangeUserValidation = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business'),
  });
  const valid = schema.validate(req.body);

  if (valid.error) {
    return res.status(400).json({
      status: valid.error.details,
    });
  }
  next();
};

module.exports = {
  addUserValidation,
  ChangeUserValidation,
};
