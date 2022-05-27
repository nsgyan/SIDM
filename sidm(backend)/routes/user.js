const express = require('express')
const router = express.Router();
const auth = require('../controllers/auth')
const User = require('../controllers/user')
const Payment= require('../controllers/payment')
const offlinePayment= require('../controllers/offlinePayment')
const Assessor= require('../controllers/assessor')
router.post('/addAdmin', User.addAdminUser);
router.post('/login/assessor',Assessor.login);
router.post('/signup/assessor',Assessor.signup);
router.post('/reset/assessor/password',Assessor.passwordReset);
router.post('/assessor/checkemail', Assessor.getEmail);
router.get('/assessor',  Assessor.getAssessor);
router.post('/login', User.loginVerify);
router.post('/memberLogin', User.memberLogin);

router.get('/memberdata', auth.memberAuth, User.memberData);

router.get('/getStateList', User.getState);
router.post('/checkemail', User.getEmail);
router.post('/checkMobile', User.getMobile);
router.post('/checkPan', User.getPan);
router.post('/payment', Payment.payNow);
router.post('/verifypayment', Payment.verifypayment);

router.get('/viewPayment/:userID',auth.auth, Payment.viewpayment);
router.post('/offlinePayment' ,auth.auth, offlinePayment.postPaymentDetails);

router.get('/getPaymentDetails/:userID',auth.auth,  offlinePayment.getPaymentDetails);




module.exports = router;