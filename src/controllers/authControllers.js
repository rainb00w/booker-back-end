const User = require('../models/user');
const createError = require('http-errors');
const { passwordGeneration, passwordCompare } = require("../services/passwordGeneration");
const { tokenGeneration }  = require("../services/tokenGeneration");

const registration = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const error = createError(409, "User with this email is already registered");
            throw error;
        }

      const hashedPassword = passwordGeneration(password);

      const data = User.create({ name, email, password: hashedPassword });
        res.status(201).json({data})
    }
    catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            const error = createError(401, "Email or password is wrong");
            throw error;
        }

        const compare =  await passwordCompare(password, user.password);
        if (!compare) {
            const error = createError(401, "Email or password is wrong");
            throw error;
      }
      
      const payload = { id: user._id };
      const token = tokenGeneration(payload);
      await User.findByIdAndUpdate(user._id, { token });

      res.status(200);
    }
    catch (err) {
        if (err.message.includes("validation failed")) err.status = 400;
        next(err);
    }
};

module.exports = {
    registration,
    login
};