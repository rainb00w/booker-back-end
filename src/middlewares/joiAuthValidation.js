const joi = require('joi');

module.exports = {
     registrationValidation: (req, res, next) => {
        const schema = joi.object({
            name: joi.string()
                .min(2)
                .max(30)
                .trim(true)
                .required(),
            email: joi.string()
                .min(6)
                .max(50)
                .required(),
            password: joi.string()
                .min(6)
                .max(30)
                .required(),
        });

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            console.log(validationResult.error)
            return res.status(400).json({ message: "missing required name field or the field did not pass validation" });
        }
        next();
    },

    loginValidation: (req, res, next) => {
        const schema = joi.object({
            email: joi.string()
                .min(6)
                .max(50)
                .required(),
            password: joi.string()
                .min(6)
                .max(30)
                .required(),
        });

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            console.log(validationResult.error)
            return res.status(400).json({ message: "missing required name field or the field did not pass validation" });
        }
        next();
    },
};