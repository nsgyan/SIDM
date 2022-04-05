const express = require('express')
const router = express.Router();
const User = require('../controllers/user')
router.post('/addAdmin', User.addAdminUser);

router.post('/login', User.loginVerify);

router.get('/getStateList', User.getState);
router.get('/checkemail', User.getEmail);



module.exports = router;