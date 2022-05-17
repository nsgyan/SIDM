const express = require('express')
const router = express.Router();
const Register = require('../controllers/register')
const auth= require('../controllers/auth')

router.post('/formsData', Register.postRegistrationForm);
router.get('/formsData', Register.getForms);
router.patch('/update/:userID',auth.auth, Register.updateFrom)
router.patch('/changeStatus/:userID',auth.adminAuth, Register.changeStatus)
router.post('/memberLogin', Register.getUserData);
router.get('/memberdata/:memberId',auth.auth, Register.getmemberData);



module.exports = router;
