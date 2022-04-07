import { environment } from "../../../environments/environment.prod";
export class Globals {
    public static readonly server = environment.serverUrl;
    public static readonly route = {
        'formsData': Globals.server + 'sidm/formsData',
        'login': Globals.server + 'user/login',
        'getStateList': Globals.server + 'user/getStateList',
        'update': Globals.server + 'sidm/update',
        'checkEmail': Globals.server + 'user/checkemail',
        'checkMobile': Globals.server + 'user/checkMobile',
        'checkPan': Globals.server + 'user/checkPan',
        'memberdata': Globals.server + 'sidm/memberdata',
        'memberLogin': Globals.server + 'user/memberLogin'

    };
}