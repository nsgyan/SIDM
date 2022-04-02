const express = require('express')
const router = express.Router();
const Register = require('../controllers/register')

router.post('/', Register.postRegistrationForm);
router.get('/formsData', Register.getForms);
router.patch('/update/:userID', Register.updateFrom)
router.post('/memberLogin', Register.getUserData);
router.get('/memberdata/:memberId', Register.getmemberData);



module.exports = router;
