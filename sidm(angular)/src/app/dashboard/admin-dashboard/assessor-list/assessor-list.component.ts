import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-assessor-list',
  templateUrl: './assessor-list.component.html',
  styleUrls: ['./assessor-list.component.css']
})
export class AssessorListComponent implements OnInit {
  displayedColumns: string[] = [ 'createAt', 'assessorCompanyName','assessorName','email','mobileNumber'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private httpService:HttpService) {
    this.httpService.getassessor().subscribe((data:any)=>{
      console.log(data);
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
  ngOnInit(): void {
  }

}
