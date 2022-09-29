require('dotenv').config();

const { BASE_URL } = process.env;

const urlVereficationToken = (token) => { 
    const urlPath = `<a target="_blank" href="${BASE_URL}/api/user/verify/${token}">Click to confirm email</a>`;
    return urlPath;
};

module.exports = urlVereficationToken;