const joi = require('joi');

module.exports = {
    repeatVerifyEmailValidation: (req, res, next) => {
        const schema = joi.object({
            email: joi.string()
                .min(10)
                .max(63)
                .required()
        });

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: "missing required field email" });
        }
        next();
    }
};