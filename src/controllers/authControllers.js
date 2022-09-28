const User = require('../models/user');
const createError = require('http-errors');

const { passwordGeneration, passwordCompare } = require("../services/passwordGeneration");
const { tokenGeneration } = require("../services/tokenGeneration");


const registration = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userName =  await User.findOne({ name });
        const userEmail = await User.findOne({ email });

        if (userName && userEmail) {
            const error = createError(409, "name&email");
            throw error;
        }

        if (userName) {
            const error = createError(409, "name");
            throw error;
        }

        if (userEmail) {
            const error = createError(409, "email");
            throw error;
        }

        // ? hash password
        const hashPassword = await passwordGeneration(password);

        const data = await User.create({ name, email, password: hashPassword });
        const takeToken = await User.findOne({ email });
        
        const payload = { id: takeToken._id };
        const token = tokenGeneration(payload);
        await User.findByIdAndUpdate(takeToken._id, { token });

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

        const compare = await passwordCompare(password, user.password);
        if (!compare) {
            const error = createError(401, "Email or password is wrong");
            throw error;
        }

        const payload = { id: user._id };
        const token = tokenGeneration(payload);
        await User.findByIdAndUpdate(user._id, { token });

        res.status(200).json({token})
    }
    catch (err) {
        if (err.message.includes("validation failed")) err.status = 400;
        next(err);
    }
};


const logout = async (req, res, next) => { 
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: null });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};


const current = async (req, res, next) => { 
    const { name, email } = req.user;
    res.status(200).json({ name, email });
};

module.exports = {
    registration,
    login,
    logout,
    current
};