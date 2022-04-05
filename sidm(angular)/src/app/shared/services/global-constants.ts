import { environment } from "../../../environments/environment.prod";
export class Globals {
    public static readonly server = environment.serverUrl;
    public static readonly route = {
        'formsData': Globals.server + 'sidm/formsData',
        'login': Globals.server + 'user/login',
        'memberLogin': Globals.server + 'sidm/memberLogin',
        'memberdata': Globals.server + 'sidm/memberdata',
        'getStateList': Globals.server + 'user/getStateList',
        'update': Globals.server + 'sidm/update',

    };
}