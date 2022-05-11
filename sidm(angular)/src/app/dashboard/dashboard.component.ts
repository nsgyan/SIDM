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
        if (item.category === 'cat1') {
          this.cat1 = true
          
        }
        else if (item.category === 'cat2') {
          this.cat2 = true
         
        }
        else if (item.category === 'cat3') {
          this.cat3 = true
          
        }
        else if (item.category === 'cat4') {
          this.cat4 = true
        }  
      })
 console.log(data);
 this.memberdata=data
 const url='/dashboard/member/view/'+data[0]._id
 this.routes.navigateByUrl(url);
  

    }, err => {
      this.toast.error(err.error);
      this.localStorage.clearLocalStorage()
      window.location.reload()
      this.routes.navigate(['login/member'])

    })}

    
  }

  ngOnInit() {
    this.sidenavService.setPanel(this.sidePanel);
    this.sidenavService.setContentVcf(this.vcf);
  }
  navigate(url:any){
    this.routes.navigateByUrl(url);
  }
  navigateTo(url:string,type:string){
  
    
// for(let item of this.memberdata)
// {  console.log(item);
//   if(item.catagery===type){
//     console.log('hello');
    
//   }
// }
    
    this.memberdata.map((item:any)=>{
   
      
      if(item.category===type)
      {
        console.log('hello');
        url=url+item._id
        this.routes.navigateByUrl(url);
      }

    })
  }
}