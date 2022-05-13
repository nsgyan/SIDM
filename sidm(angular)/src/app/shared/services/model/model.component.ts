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
  OfflinePayment!:FormGroup
  modeofPayment=['Cheque','Bank Draft',"NEFT",'IMPS','UPI']
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
  this.offlinePayment()
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


  onNoClick(): void {
    this.dialogRef.close();
  }
}