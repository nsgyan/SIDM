import { HttpClient, HttpParams, HttpEvent, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Globals } from "./global-constants";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpService: HttpClient,
    private localStroage: LocalStorageService) { }

  postregistrationForm(formData: any) {
    return this.httpService.post(Globals.route.formsData, formData);
  }
  assessorRequiredDocument(formData: any) {
    return this.httpService.post(Globals.route.assessorRequiredDocument, formData);
  }
  adminlogin(adminData: any) {
    return this.httpService.post(Globals.route.login, adminData)
  }
  signupAssessor(assessordata:any){
    return this.httpService.post(Globals.route.signupAssessor,assessordata)
  }
  checkAssessorEmail(data: any) {
    return this.httpService.post(Globals.route.assessorCheckEmail, data)
  }
  checkAssessorMobile(data: any) {
    return this.httpService.post(Globals.route.assessorCheckMobile, data)
  }
  getassessor() {
    return this.httpService.get(Globals.route.assessor)
  }
  assessorPasswordReset(data:any) {
    return this.httpService.post(Globals.route.assessorPasswordReset,data)
  }
  assessorLogin(assessordata:any){
    return this.httpService.post(Globals.route.loginAssessor,assessordata)
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
  findByCategory(category:any){
    return this.httpService.post(`${Globals.route.findByCategory}`,category)
  }
  
  questionnaireAissment(data:any){
    return this.httpService.post(Globals.route.questionnaireAissment,data)
  }
  updateQuestionnaireAissmentAdmin(data:any){
    return this.httpService.post(Globals.route.updateQuestionnaireAissment,data)
  }
  staticAissmentQuestionnaire(data:any){
    return this.httpService.post(Globals.route.staticAissmentQuestionnaire,data)
  }
  updateStaticAissmentQuestionnaire(data:any){
    return this.httpService.post(Globals.route.updateStaticAissmentQuestionnaire,data)
  }
  getQuestionnaireAissment(id:any){
    return this.httpService.get(`${Globals.route.questionnaireAissment}/${id}`)
  }
  assessorDashboard(category:any,typeOfApplicant:any){
    
    let queryParams = new HttpParams();
    queryParams = queryParams.append("category", category);
    queryParams = queryParams.append("typeOfApplicant", typeOfApplicant);

    return this.httpService.get(`${Globals.route.assessorDashboard}`, {
      params: queryParams
    })
  }
  assessmentsList(){
return this.httpService.get(Globals.route.assessmentsList)
  }

  applicantQuestionnaire(){

    return this.httpService.get(Globals.route.applicantQuestionnaire)
  }

  filterAssessmentsList(category:any,typeOfApplicant:any){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("category", category);
    queryParams = queryParams.append("typeOfApplicant", typeOfApplicant);
    return this.httpService.get(`${Globals.route.filterAssessmentsList}`, {
      params: queryParams
    })
  }
  assessorApplicantList(category:any,typeOfApplicant:any,status:any,asaessorEmail:any){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("category", category);
    queryParams = queryParams.append("typeOfApplicant", typeOfApplicant);
    queryParams = queryParams.append("status", status);
    queryParams = queryParams.append("asaessorEmail", asaessorEmail);

    return this.httpService.get(`${Globals.route.assessorApplicantList}`, {
      params: queryParams
    })
  }
  applicantQuestionnaireApplicantList(category:any,typeOfApplicant:any,status:any){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("category", category);
    queryParams = queryParams.append("typeOfApplicant", typeOfApplicant);
    queryParams = queryParams.append("status", status);


    return this.httpService.get(`${Globals.route.applicantQuestionnaireApplicantList}`, {
      params: queryParams
    })
  }
  updateQuestionnaireAissment(data:any){
    return this.httpService.post(Globals.route.updateQuestionnaire,data)
  }
  paynow(id:any)
{
  return this.httpService.post(Globals.route.payment,id)
}

postOflinePayment(data:any){
  return this.httpService.post(Globals.route.offlinePayment,data)
}

postQuestionnaire(data:any){
  return this.httpService.post(Globals.route.postQuestionnaire,data)
}
getQuestionnaire(){
  return this.httpService.get(Globals.route.getQuestionnaire)
}
getQuestionnaireById(id:any){
  return this.httpService.get(`${Globals.route.getQuestionnaireById}/${id}`)
}
updateQuestionnaireById(id:any,data:any){
  return this.httpService.patch(`${Globals.route.updateQuestionnaireById}/${id}`,data)
}
 
deleteQuestionnaire(id:any){
  return this.httpService.delete(`${Globals.route.deleteQuestionnaire}/${id}`)
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
