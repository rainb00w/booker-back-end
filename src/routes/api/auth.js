const express = require('express');
const router = express.Router();

const { registrationValidation, loginValidation } = require('../../middlewares/joiAuthValidation');

const { registration, login, googleAuth, googleRedirect } = require('../../controllers/authControllers');


router.post('/registration', registrationValidation, registration);
router.post('/login', loginValidation, login);
// ! google
router.get('/google', googleAuth);
router.get('/google-redirect', googleRedirect);

module.exports = router;
