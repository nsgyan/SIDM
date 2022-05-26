import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.css']
})
export class QuestionnaireListComponent implements OnInit {
  displayedColumns: string[] = [ 'category', 'parameter','inputType','textBox','upload', 'maxScore','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private fb:FormBuilder,
    private httpService: HttpService,
    private toast: ToastrService,
    private routes: Router,) {
this.httpService.getQuestionnaire().subscribe((data:any)=>{
  data.map((item:any)=>{
    if (item.category === 'cat1') {
      item.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
    }
    else if (item.category === 'cat2') {
      item.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
    }
    else if (item.category === 'cat3') {
      item.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
    }
    else if (item.category === 'cat4') {
      item.category = 'C4- Export Performance of Defence & Aerospace Products'
    }
  })
  this.dataSource = new MatTableDataSource(data);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
},err=>{
  this.routes.navigate(['login/admin'])
}) 
}

  ngOnInit(): void {
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editQuestionnaire(id:any){
    let url: string = "/dashboard/admin/questionnaireList/edit/" +id
    this.routes.navigateByUrl(url);

  }
  view(id:any){
    let url: string = "/dashboard/admin/viewQuestionnaire/"+id
    this.routes.navigateByUrl(url);
  }

}
