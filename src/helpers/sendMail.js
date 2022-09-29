const sendGrid = require('@sendgrid/mail');
require('dotenv').config();

const { SENGRID_VALID_MAIL, SENDGRID_KEY } = process.env;
sendGrid.setApiKey(SENDGRID_KEY);

const sendMail = async (data) => {
    const message = { ...data, from: `${SENGRID_VALID_MAIL}` };
    await sendGrid.send(message)
        .then(() => console.log("Message sent successfully"))
        .catch(err =>  console.error(err));
    return true;
};

module.exports = sendMail;