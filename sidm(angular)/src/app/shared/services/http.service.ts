import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.httpService.get(`${Globals.route.formsdata}/${id}`)
  }
  getData(page: number, itemPerPage: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("itemPerPage", itemPerPage);
    return this.httpService.get(Globals.route.formsData, {
      params: queryParams
    })
  }
  changeStatus(id:string,data:any){
    return this.httpService.patch(`${Globals.route.changeStatus}/${id}`,data)
  }
 updateform(id: string, data: any) {
    return this.httpService.patch(`${Globals.route.update}/${id}`, data)
  }
  
  paynow(id:String)
{
  return this.httpService.get(`${Globals.route.payment}/${id}`)
}

postOflinePayment(data:any){
  return this.httpService.post(Globals.route.offlinePayment,data)
}

postQuestionnaire(data:any){
  return this.httpService.post(Globals.route.postQuestionnaire,data)
}

getOflinePayment(id:any){
  return this.httpService.get(`${Globals.route.getPaymentDetails}/${id}`)

}

verifypayment(data:any){
  return this.httpService.post(Globals.route.verifypayment,data)
}
ViewPayment(id:any){
  return this.httpService.get(`${Globals.route.viewPayment}/${id}`)
}



getStateList() {
    return this.httpService.get(Globals.route.getStateList)
  }

  checkEmail(data: any) {
    return this.httpService.post(Globals.route.checkEmail, data)
  }
  checkMobile(data: any) {
    return this.httpService.post(Globals.route.checkMobile, data)
  }
  checkPan(data: any) {
    return this.httpService.post(Globals.route.checkPan, data)
  }
  getMemberData() {
    return this.httpService.get(Globals.route.memberdata)
  }

  memberlogin(memberLoginData: any) {
    return this.httpService.post(Globals.route.memberLogin, memberLoginData)
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest(
      'POST',
      Globals.route.upload,
      formData,
      {
        reportProgress: false,
        responseType: 'text',
      }
    );

    return this.httpService.request(request);
  }

  uploadImage(data: any) {
    let api_url = Globals.route.upload;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        Accept: 'multipart/form-data',
      }),
    };
    return this.httpService.post(api_url, data, httpOptions);
  }
}
