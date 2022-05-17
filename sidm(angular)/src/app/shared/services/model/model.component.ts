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
  requestInfo !:FormGroup ;
  modeofPayment=['Cheque','Bank Draft',"NEFT/RTGS",'IMPS','UPI']
  submited!: boolean;
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
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  offlinePayment()
  {
    this.OfflinePayment=this.formBuilder.group({
      id:[this.data?.id,Validators.required],
      nameOfBank:['',Validators.required],
      modeOfPayment:['',Validators.required],
      amount:['',Validators.required],
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
}