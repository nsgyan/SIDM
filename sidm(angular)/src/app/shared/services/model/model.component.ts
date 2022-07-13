import { escapeRegExp } from '@angular/compiler/src/util';
import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  OfflinePayment!:FormGroup;
  assessorPasswordReset!:FormGroup
  adminAssessorCallforRevie!:FormGroup
  assessorAssessorRequestInfo!:FormGroup
  requestInfo !:FormGroup ;
  modeofPayment=['Cheque','Bank Draft',"NEFT/RTGS",'IMPS','UPI']
  submited!: boolean;
  uploadDocumnet: any;
  constructor(
    private  formBuilder :FormBuilder,
    private toast: ToastrService,
    private httpService: HttpService,
    public dialogRef: MatDialogRef<ModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
if(data.type==='offlinePayment')
{
  this.submited=false
  this.offlinePayment()
}
else if(data.type==='requestInfo')
{
  this.submited=false
  this.requestInfoStatus()
}
else if(data.type==='approve')
{
  this.submited=false
}
else if(data.type==='assessor/passwordReset'){
this.assessPassword()
}
else if(data.type==='adminAssessorRequestInfo'){
  this.adminAssessorCallforReview()
}
else if(data.type==='assessorAssessorRequestInfo'){
  this.assessorAssessorRequest()
}
    
  }
  ngOnInit(): void {
    
  }
  resetConfirmPassword($event:any){
    this.assessorPasswordReset.get('confirmPassword')?.reset()
  }
  assessPassword(){
    this.assessorPasswordReset=this.formBuilder.group({
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',Validators.required],
    })
  }

  offlinePayment()
  {
    let totalAmount= this.data.amount+this.data.gst
    this.OfflinePayment=this.formBuilder.group({
      id:[this.data?.id,Validators.required],
      nameOfBank:['',Validators.required],
      modeOfPayment:['',Validators.required],
      amount:[totalAmount,Validators.required],
      dateOfPayment:['',Validators.required],
      transactionDetails:['',Validators.required]
    })
  }

  pickclender() {
    return false
  }

  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  submitOfflinePaymentDetails(){
    this.submited=true
    if(this.OfflinePayment.valid)
    {
      this.httpService.postOflinePayment({
       registrationId:this.OfflinePayment.value.id,
       dateOfPayment:this.OfflinePayment.value.dateOfPayment,
       amount:this.OfflinePayment.value.amount,
       transactionDetails:this.OfflinePayment.value.transactionDetails,
       modeOfPayment:this.OfflinePayment.value.modeOfPayment,
       nameOfBank:this.OfflinePayment.value.nameOfBank,
      }).subscribe((data:any)=>{
        this.dialogRef.close();
        window.location.reload()
       this.toast.success(data)
      },err=>{
       this.toast.error(err)
       window.location.reload()
      })
    }
    else{
     this.toast.error('Please Fill Required Field');
    }
     
   }
   adminAssessorCallforReview(){
this.adminAssessorCallforRevie= this.formBuilder.group({
  adminAssessorCallforReview:[this.data.adminRemark?this.data.adminRemark:'']
})
   }
   assessorAssessorRequest(){
    this.assessorAssessorRequestInfo= this.formBuilder.group({
     remark:[this.data.adminRemark?this.data.adminRemark:'']
    })
       }
   remark(){
    let createAt = new Date();

    this.httpService.changeStatus(this.data.id,{status:'Request Info',message:this.requestInfo.value.remark,createAt:createAt}).subscribe(data=>{
      this.toast.success('successfully status change');
      this.dialogRef.close();
      window.location.reload()   
    },err=>{
      this.toast.error('Please try again');
    })
  }


  confirmPassword(event: any,) {
    if (event.target.value !== this.assessorPasswordReset.value.password) {
      this.assessorPasswordReset.get('confirmPassword')?.setErrors({ confirmPassword: true })
    }
  }
   requestInfoStatus(){
    this.requestInfo=this.formBuilder.group({
      remark:['']
    })
   }

   approve() {
    let createAt = new Date();
    this.httpService.changeStatus(this.data.id, { status: 'Approved', createAt: createAt }).subscribe(data => {
      window.location.reload()    
      this.toast.success('successfully status change');
      this.dialogRef.close();
    },err=>{
      this.toast.error('Please try again');

    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onNoClickadminAssessor(){
    this.dialogRef.close(null);
  }
  closeDialog(){
 
    this.dialogRef.close({remark:this.adminAssessorCallforRevie.value.adminAssessorCallforReview});
  }
  onNoClickAssessor(){
    this.dialogRef.close(null);
  }
  closeDialogAssessor(){
 
    this.dialogRef.close({remark:this.assessorAssessorRequestInfo.value.remark});
  }

  resetPassword(){
    if(this.assessorPasswordReset.valid){
      this.httpService.assessorPasswordReset({email:this.data.id,password:this.assessorPasswordReset.value.password}).subscribe(data=>{
         this.toast.success(' Password successfully  changed');
         this.onNoClick()
      },err=>{
        this.onNoClick()
        this.toast.error('Please try again');
  
      })
    }
    else{
      this.toast.error('Please Fill Required Field');
    }
  }

  
upload($event: any){
  let file = $event.target.files;



  if (
    file[0].type == 'image/png' ||
    file[0].type == 'image/jpg' ||
    file[0].type == 'image/jpeg' ||
    file[0].type == 'application/pdf'
  ) {


    if (parseInt(file[0].size) > 2097152) {
    this.toast.error('file to large')
  }
  else {
    const date = 'Wed Feb 20 2019 00:00:00 GMT-0400 (Atlantic Standard Time)';
    const time = '7:00 AM';
    this.httpService.upload(file[0]).subscribe((data: any) => {

      this.uploadDocumnet=data.body
    })

    }
  }
  else {
    this.toast.error('File uploaded is invalid!')
  }
}
documentUpoaded(){
  this.dialogRef.close({document:this.uploadDocumnet});
}

  noClick(type:any){
    this.dialogRef.close(type);
  }
}