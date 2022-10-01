require('dotenv').config();

const { BASE_URL } = process.env;

const urlNewPasswordToken = (passwordToken) => { 
    const urlPath = `
    <p>Someone is trying to change your account password.
    If this is you, click on the link below to confirm the password change:</p>
    <a target="_blank" href="${BASE_URL}/api/user/forgotPassword/${passwordToken}">
    Click to confirm password change
    </a>
    <p>Or ignore this message</p>`
    ;
    return urlPath;
};

module.exports = urlNewPasswordToken;