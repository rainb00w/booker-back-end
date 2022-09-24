const express = require('express');
const router = express.Router();

const { registrationValidation, loginValidation } = require('../../middlewares/joiAuthValidation');

const { registration, login } = require('../../controllers/authControllers');


router.post('/registration', registrationValidation, registration);
router.post('/login', loginValidation, login);

module.exports = router;
