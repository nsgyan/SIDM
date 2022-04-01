const express = require('express')
const router = express.Router();
const Register = require('../controllers/register')

router.post('/', Register.postRegistrationForm);
router.get('/formsData', Register.getForms);
router.get('/formsData/:userId', Register.getUserData);


module.exports = router;
