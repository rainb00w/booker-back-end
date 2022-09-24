const jwt = require("jsonwebtoken");
require('dotenv').config();

const { SECRET } = process.env;

const tokenGeneration = (payload) => {
    const token = jwt.sign(payload, SECRET, {expiresIn: "1h"});
    return token;
};

const tokenVerify = (token) => {
    const { id } = jwt.verify(token, SECRET);
    return id;
};


    module.exports = {
        tokenGeneration,
        tokenVerify
    };