const express = require('express')
const router = express.Router();
const auth = require('../controllers/auth')
const User = require('../controllers/user')
const Payment= require('../controllers/payment')
const offlinePayment= require('../controllers/offlinePayment')
router.post('/addAdmin', User.addAdminUser);

router.post('/login', User.loginVerify);
router.post('/memberLogin', User.memberLogin);

router.get('/memberdata', auth.memberAuth, User.memberData);

router.get('/getStateList', User.getState);
router.post('/checkemail', User.getEmail);
router.post('/checkMobile', User.getMobile);
router.post('/checkPan', User.getPan);
router.get('/payment/:userID', Payment.payNow);
router.post('/verifypayment', Payment.verifypayment);

router.get('/viewPayment/:userID',auth.auth, Payment.viewpayment);
router.post('/offlinePayment' ,auth.auth, offlinePayment.postPaymentDetails);

router.get('/getPaymentDetails/:userID',auth.auth,  offlinePayment.getPaymentDetails);




module.exports = router;