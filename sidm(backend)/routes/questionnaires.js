const express = require('express')
const router = express.Router();
const Questionnaire = require('../controllers/questionnaire')
const auth= require('../controllers/auth')

router.get('',Questionnaire.addQuestionnaires);
router.post('/add',auth.adminAuth,Questionnaire.addQuestionnaires);



module.exports = router;
