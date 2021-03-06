import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { HttpService } from '../shared/services/http.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { SideNavService } from '../shared/services/side-nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  type='admin'
  memberdata:any
  Quescat1!:any
  Quescat2!:any
  Quescat3!:any
  Quescat4!:any
  QuesStatusCat1!:any
  QuesStatusCat2!:any
  QuesStatusCat3!:any
  QuesStatusCat4!:any
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  @ViewChild('panel', { static: true }) private sidePanel!: MatSidenav;
  @ViewChild('content', { static: true, read: ViewContainerRef }) private vcf!: ViewContainerRef;
  cat2!: boolean;
  cat1!: boolean;
  cat3!: boolean;
  cat4!: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
    private localStorage: LocalStorageService,
     private sidenavService: SideNavService,
     private toast: ToastrService,
     private httpService: HttpService,
     private routes: Router,) {
     if(this.localStorage.get('type')==='member'){
this.type='member'
    this.httpService.getMemberData().
    subscribe((data: any) => {
      
      data.map((item:any)=>{
        console.log(item.typeOfApplicant);
        
        if (item.category === 'cat1') {
          this.cat1 = true
          if(item.paymentStatus==='Paid'){
          this.getQuestionnaire('cat1',item.typeOfApplicant)
          if(item.questionnaireStatus==='Submitted'){
            this.QuesStatusCat1=true
          }
        }

          
        }
        else if (item.category === 'cat2') {
          this.cat2 = true
          if(item.paymentStatus==='Paid'){
          this.getQuestionnaire('cat2',item.typeOfApplicant)
          if(item.questionnaireStatus==='Submitted'){
            this.QuesStatusCat2=true
          }}
         
        }
        else if (item.category === 'cat3') {
          this.cat3 = true 
          if(item.paymentStatus==='Paid'){
          this.getQuestionnaire('cat3',item.typeOfApplicant)
          if(item.questionnaireStatus==='Submitted'){
            this.QuesStatusCat3=true
          }}
        }
        else if (item.category === 'cat4') {
          this.cat4 = true
          if(item.paymentStatus==='Paid'){
          this.getQuestionnaire('cat4',item.typeOfApplicant)
          if(item.questionnaireStatus==='Submitted'){
            this.QuesStatusCat4=true
          }
        }
        }  
      })

 this.memberdata=data

  

    }, err => {
      this.toast.error(err.error);
      this.localStorage.clearLocalStorage()
      window.location.reload()
      this.routes.navigate(['login/member'])

    })}
    else if(this.localStorage.get('type')==='assessor'){
      this.type='assessor'
    }
    
  }

  ngOnInit() {
    this.sidenavService.setPanel(this.sidePanel);
    this.sidenavService.setContentVcf(this.vcf);
  }
  navigate(url:any){
    this.routes.navigateByUrl(url);
  }
  navigateTo(url:string,type:string){
  

    
    this.memberdata.map((item:any)=>{
   
      
      if(item.category===type)
      {
        url=url+item._id
        window.location.href=url
      }

    })
  }
  
  logout() {
    this.localStorage.clearLocalStorage()
    window.location.reload()
    this.routes.navigate(['login/member'])

  }

  getQuestionnaire(category:any,typeOfApplicant:any){
    this.httpService.findByCategory({category:category,typeOfApplicant:typeOfApplicant}).subscribe((data:any)=>{
      if(data[0]?.category==='cat1' ){
        this.Quescat1=true
      } 
      else  if(data[0]?.category==='cat2'){
        this.Quescat2=true
      } 
      else  if(data[0]?.category==='cat3'){
        this.Quescat3=true
      } 
      else  if(data[0]?.category==='cat4'){
        this.Quescat4=true
      } 
      
    })
  }
}