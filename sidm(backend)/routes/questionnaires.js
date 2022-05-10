const express = require('express')
const router = express.Router();
const questionnaires=require('../controllers/questionnaire')
const auth= require('../controllers/auth')

router.get('',questionnaires.getQuestionnaires);
router.post('/add',questionnaires.addQuestionnaires);
router.get('/get/:userID', questionnaires.getQuestionnairesByID)
router.patch('/update/:userID', questionnaires.updateQuestionnaires)



module.exports = router;
