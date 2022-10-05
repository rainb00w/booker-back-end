const joi = require('joi');

module.exports = {
    registrationValidation: (req, res, next) => {
        const schema = joi.object({
            name: joi.string()
                .min(3)
                .max(100)
                .trim()
                .pattern(/^[a-zA-Z0-9][0-9a-zA-Z\*\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>,\.\?\/\~_\+\-\=\|\\\ ]{2,99}$/)
                .required(),
            email: joi.string()
                .min(10)
                .max(63)
                .pattern(/^(?!-)([\w\.\!#\$%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{2,})+@(([\w\.\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{1,56})+\.)+[\w]{2,}(?!-)$/)
                .required(),
            password: joi.string()
                .min(5)
                .max(30)
                .pattern(/^(?!\-|\.)[0-9a-zA-Z\*\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>,\.\?\/\~_\+\-\=\|\\]{5,30}$/)
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
                .min(10)
                .max(63)
                .pattern(/^(?!-)([\w\.\!#\$%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{2,})+@(([\w\.\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{1,56})+\.)+[\w]{2,}(?!-)$/)
                .required(),
            password: joi.string()
                .min(5)
                .max(30)
                .pattern(/^(?!\-|\.)[0-9a-zA-Z\*\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>,\.\?\/\~_\+\-\=\|\\]{5,30}$/)
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