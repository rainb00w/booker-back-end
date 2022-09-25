const User = require('../models/user');
const createError = require('http-errors');
const axios = require('axios');
const queryString = require('query-string'); 
// const URL = require('url');
require('dotenv').config();

const { passwordGeneration, passwordCompare } = require("../services/passwordGeneration");
const { tokenGeneration } = require("../services/tokenGeneration");




const registration = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const error = createError(409, "User with this email is already registered");
            throw error;
        }

        // hash password
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


const googleAuth = async (req, res, next) => {
    try {
        const stringifyParams = queryString.stringify({
            client_id: process.env.GOOGLE_ID,
            redirect_uri: `${process.env.BASE_URL}/api/user/google-redirect`,
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
            ].join(" "),
            response_type: "code",
            access_type: "offline",
            prompt: "consent"
        });

        return res.redirect(
            `https://accounts.google.com/o/oauth2/v2/auth?${stringifyParams}`
        );
    }
    catch (err) {
        next(err);
    }
};


const googleRedirect = async (req, res, next) => {
    try {
        const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
        console.log("fullURL", fullUrl)
        const urlObj = new URL(fullUrl);
        console.log("urlOBJ", urlObj)

        const urlParams = queryString.parse(urlObj.search);
        console.log("urlPARAMS", urlParams)
        const code = urlParams.code;
        console.log("code", code)

        const tokenData = await axios({
            url: `https://oauth2.googleapis.com/token`,
            method: "post",
            data: {
                client_id: process.env.GOOGLE_ID,
                client_secret: process.env.GOOGLE_SECRET,
                redirect_uri: `${process.env.BASE_URL}/api/user/google-redirect`,
                grant_type: "authorization_code",
                code: code,
            },
        });

        const userData = await axios({
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
            method: "get",
            headers: {
                Authorization: `Bearer ${tokenData.data.access_token}`,
            },
        });

        return res.redirect(
            `${process.env.FRONTEND_URL}?email=${userData.data.email}`
        )
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    registration,
    login,
    googleAuth,
    googleRedirect
};