const express = require('express')
const router = express.Router();
const Register = require('../controllers/register')
const auth= require('../controllers/auth')

router.post('/formsData', Register.postRegistrationForm);
router.get('/formsData', auth.adminAuth, Register.getForms);
router.patch('/update/:userID',auth.memberAuth, Register.updateFrom)
router.post('/memberLogin', Register.getUserData);
router.get('/memberdata/:memberId', Register.getmemberData);



module.exports = router;
