const express = require('express')
const router = express.Router();
const questionnaires=require('../controllers/questionnaire')
const auth= require('../controllers/auth')

router.get('',questionnaires.getQuestionnaires);
router.post('/add', auth.adminAuth,questionnaires.addQuestionnaires);
router.get('/get/:userID', auth.adminAuth, questionnaires.getQuestionnairesByID)
router.patch('/update/:userID', auth.adminAuth, questionnaires.updateQuestionnaires)
router.post('/findByCategory',auth.auth,questionnaires.findByCategory)
router.post('/assessorScore',auth.auth,questionnaires.assessorScore)
router.post('/questionnaireAissment',auth.auth,questionnaires.aissmentQuestionnaire)
router.get('/questionnaireAissment/:userId',auth.auth,questionnaires.getAissmentQuestionnaire)
router.delete('/deleteQuestionnaire/:userId', auth.adminAuth,questionnaires.deleteQuestionnairesByID)
router.get('/formsData',questionnaires.findmember);



module.exports = router;
