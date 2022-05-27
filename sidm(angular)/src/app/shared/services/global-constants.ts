import { environment } from "../../../environments/environment.prod";
export class Globals {
    public static readonly server = environment.serverUrl;
    public static readonly route = {
        'formsData': Globals.server + 'sidm/formsData',
        'login': Globals.server + 'user/login',
        'loginAssessor': Globals.server + 'user/login/assessor',
        'signupAssessor': Globals.server + 'user/signup/assessor',
        'assessorCheckEmail': Globals.server + 'assessor/checkemail',
        'assessor': Globals.server + 'user/assessor',
        'assessorCheckMobile': Globals.server + 'assessor/checkMobile',
        'getStateList': Globals.server + 'user/getStateList',
        'update': Globals.server + 'sidm/update',
        'changeStatus': Globals.server + 'sidm/changeStatus',
        'checkEmail': Globals.server + 'user/checkemail',
        'checkMobile': Globals.server + 'user/checkMobile',
        'checkPan': Globals.server + 'user/checkPan',
        'formsdata':  Globals.server + 'sidm/memberdata',
        'memberdata': Globals.server + 'user/memberdata',
        'memberLogin': Globals.server + 'user/memberLogin',
        'upload': Globals.server + 'upload',
        'payment': Globals.server + 'user/payment',
        'verifypayment':Globals.server+'user/verifypayment',
        'viewPayment':Globals.server+'user/viewPayment',
        'offlinePayment':Globals.server+'user/offlinePayment',
        'getPaymentDetails':Globals.server+'user/getPaymentDetails',
        'postQuestionnaire':Globals.server+'questionnaire/add',
        'getQuestionnaire':Globals.server+'questionnaire',
        'getQuestionnaireById':Globals.server+'questionnaire/get',
        'updateQuestionnaireById':Globals.server+'questionnaire/update',
        'findByCategory':Globals.server+'questionnaire/findByCategory',
        'questionnaireAissment':Globals.server+'questionnaire/questionnaireAissment',
        'deleteQuestionnaire':Globals.server+'questionnaire/deleteQuestionnaire',
        'updateQuestionnaire':Globals.server+'questionnaire/assessorScore'
    };
}