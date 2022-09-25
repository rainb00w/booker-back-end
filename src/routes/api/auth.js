const express = require('express');
const router = express.Router();

// * Middlewares
const authentificate = require('../../middlewares/autentificate');
const { registrationValidation, loginValidation } = require('../../middlewares/joiAuthValidation');

// * Controllers
const { registration, login, logout, current } = require('../../controllers/authControllers');
const { googleAuth, googleRedirect } = require('../../controllers/authGoogleControleers');


router.post('/registration', registrationValidation, registration);
router.post('/login', loginValidation, login);
router.get('/logout', authentificate, logout);
router.get('/current', authentificate, current);
// ! google
router.get('/google', googleAuth);
router.get('/google-redirect', googleRedirect);


module.exports = router;