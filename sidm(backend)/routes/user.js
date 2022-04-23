const express = require('express')
const router = express.Router();
const auth = require('../controllers/auth')
const User = require('../controllers/user')
const Payment= require('../controllers/payment')
router.post('/addAdmin', User.addAdminUser);

router.post('/login', User.loginVerify);
router.post('/memberLogin', User.memberLogin);

router.get('/memberdata', auth.memberAuth, User.memberData);

router.get('/getStateList', User.getState);
router.post('/checkemail', User.getEmail);
router.post('/checkMobile', User.getMobile);
router.post('/checkPan', User.getPan);
router.get('/payment/:userID', Payment.payNow);



module.exports = router;