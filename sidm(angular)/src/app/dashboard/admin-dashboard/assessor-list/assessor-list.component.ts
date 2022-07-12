import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ModelComponent } from 'src/app/shared/services/model/model.component';

@Component({
  selector: 'app-assessor-list',
  templateUrl: './assessor-list.component.html',
  styleUrls: ['./assessor-list.component.css']
})
export class AssessorListComponent implements OnInit {
  displayedColumns: string[] = [ 'createAt', 'assessorName','email','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private httpService:HttpService,
    private dialog:MatDialog,
    private localStorage: LocalStorageService,
    private routes: Router,) {
      let type= this.localStorage.get('type');
      if(type!=="admin"){
this.localStorage.clearLocalStorage()
this.routes.navigate(['/login/admin'])

      }
    this.httpService.getassessor().subscribe((data:any)=>{
      console.log(data);
      data.map((item:any)=>{
        const format = 'dd-MMM-yy';
        const locale = 'en-US';
        item.createAt = formatDate(item.createAt, format, locale)
      })
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
   }

     
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  passwordReset(email:any){
    const dialogRef = this.dialog.open(ModelComponent, {
      width: '500px',
      data: {id: email,type:'assessor/passwordReset'},
    });
  }
  ngOnInit(): void {
  }

}
