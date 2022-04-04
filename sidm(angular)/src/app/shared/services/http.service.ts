import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpService: HttpClient) { }

  postregistrationForm(formData: any) {
    return this.httpService.post('http://localhost:3002/sidm/formsData', formData);
  }
  adminlogin(adminData: any) {
    return this.httpService.post('http://localhost:3002/user/login', adminData)
  }
  memberlogin(memberLoginData: any) {
    return this.httpService.post(`http://localhost:3002/sidm/memberLogin`, memberLoginData)
  }
  getMemberData(id: any) {
    return this.httpService.get(`http://localhost:3002/sidm/memberdata/${id}`)
  }
  getData() {
    return this.httpService.get('http://localhost:3002/sidm/formsData')
  }

  applyNewCategory(id: string, data: any) {
    return this.httpService.patch(`http://localhost:3002/sidm/update/${id}`, data)
  }

  getStateList() {
    return this.httpService.get('http://localhost:3002/user/getStateList')

  }
}
