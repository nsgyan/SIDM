const express = require('express')
const router = express.Router();
const questionnaires=require('../controllers/questionnaire')
const auth= require('../controllers/auth')

router.get('',questionnaires.getQuestionnaires);
router.post('/add', auth.adminAuth,questionnaires.addQuestionnaires);
router.get('/get/:userID', auth.adminAuth, questionnaires.getQuestionnairesByID)
router.patch('/update/:userID', auth.adminAuth, questionnaires.updateQuestionnaires)
router.get('/findByCategory/:category',auth.auth,questionnaires.findByCategory)
router.post('/questionnaireAissment',auth.auth,questionnaires.aissmentQuestionnaire)
router.get('/questionnaireAissment/:userId',auth.auth,questionnaires.getAissmentQuestionnaire)
router.delete('/deleteQuestionnaire/:userId', auth.adminAuth,questionnaires.deleteQuestionnairesByID)



module.exports = router;
