const express = require('express')
const router = express.Router();
const Questionnaire = require('../controllers/questionnaire')
const auth= require('../controllers/auth')

router.post('/add',auth.adminAuth,Questionnaire.addQuestionnaires);


module.exports = router;
