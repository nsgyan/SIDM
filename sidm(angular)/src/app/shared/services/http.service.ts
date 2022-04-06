import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from './global-constants';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpService: HttpClient,
    private localStroage: LocalStorageService) { }

  postregistrationForm(formData: any) {
    return this.httpService.post(Globals.route.formsData, formData);
  }
  adminlogin(adminData: any) {
    return this.httpService.post(Globals.route.login, adminData)
  }
  // memberlogin(memberLoginData: any) {
  //   return this.httpService.post(Globals.route.memberLogin, memberLoginData)
  // }
  getdetails(id: any) {
    return this.httpService.get(`${Globals.route.memberdata}/${id}`)
  }
  getData() {
    return this.httpService.get(Globals.route.formsData)
  }

  applyNewCategory(id: string, data: any) {
    return this.httpService.patch(`${Globals.route.update}/${id}`, data)
  }

  getStateList() {
    return this.httpService.get(Globals.route.getStateList)

  }

  checkEmail(data: any) {
    // console.log(data);
    return this.httpService.post(Globals.route.checkEmail, data)
  }
  checkMobile(data: any) {
    // console.log(data);
    return this.httpService.post(Globals.route.checkMobile, data)
  }
  checkPan(data: any) {
    // console.log(data);
    return this.httpService.post(Globals.route.checkPan, data)
  }
  getMemberData(key: string) {
    const token = this.localStroage.get(key)
    let headers: HttpHeaders = new HttpHeaders({ 'Authorization': token });
    // headers.append('Authorization', token);
    return this.httpService.get(Globals.route.memberdata, { headers })
  }

  memberlogin(memberLoginData: any) {
    return this.httpService.post(Globals.route.memberLogin, memberLoginData)
  }
}
