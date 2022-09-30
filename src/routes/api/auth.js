const express = require('express');
const router = express.Router();

// * Middlewares
const authentificate = require('../../middlewares/autentificate');
const { registrationValidation, loginValidation } = require('../../middlewares/joi/joiAuthValidation');
const {  repeatVerifyEmailValidation } = require('../../middlewares/joi/joiVerifyEmailValidation')

// * Controllers
const {
    registration,
    login,
    logout,
    current,
    getVerify,
    repeatVerify,
    forgotPassword,
    getNewPassword
} = require('../../controllers/authControllers');
const { googleAuth, googleRedirect } = require('../../controllers/authGoogleControleers');


router.post('/registration', registrationValidation, registration);
router.post('/login', loginValidation, login);
router.get('/logout', authentificate, logout);
router.get('/current', authentificate, current);
// ! message for mail
router.get('/verify/:verificationToken', getVerify);
router.post('/verify', repeatVerifyEmailValidation, repeatVerify);
// ! google
router.get('/google', googleAuth);
router.get('/google-redirect', googleRedirect);
// ! new password
router.patch('/forgotPassword', forgotPassword);
router.get('/forgotPassword/:newPasswordToken', getNewPassword);


module.exports = router;