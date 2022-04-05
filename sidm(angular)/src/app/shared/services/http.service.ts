import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from './global-constants';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpService: HttpClient) { }

  postregistrationForm(formData: any) {
    return this.httpService.post(Globals.route.formsData, formData);
  }
  adminlogin(adminData: any) {
    return this.httpService.post(Globals.route.login, adminData)
  }
  memberlogin(memberLoginData: any) {
    return this.httpService.post(Globals.route.memberLogin, memberLoginData)
  }
  getMemberData(id: any) {
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
}
