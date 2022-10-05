const User = require('../models/user');
const { tokenGeneration } = require("../services/tokenGeneration");

const axios = require('axios');
const queryString = require('query-string'); 
require('dotenv').config();

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
        const urlObj = new URL(fullUrl);

        const urlParams = queryString.parse(urlObj.search);
        const code = urlParams.code;

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

        // ? create profile and take token
        const { email, name, picture } = userData.data;
        let profile = await User.findOne({ email });

        if (!profile) {
            await User.create({ name, email, verify: true, verificationToken: "1" });
            profile = await User.findOne({ email });
        }
        const payload = { id: profile._id };
        const token = tokenGeneration(payload);
        await User.findByIdAndUpdate(profile._id, { token });

        return res.redirect(
            `${process.env.FRONTEND_URL}login/?token=${token}&name=${name}&avatar=${picture}`
        )
    }
    catch (err) {
        next(err);
    }
};


module.exports = {
    googleAuth,
    googleRedirect,
};