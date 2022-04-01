import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {

  constructor(private localStroage: LocalStorageService,
    private httpService: HttpService) { }

  ngOnInit(): void {
    const userId = this.localStroage.get('memberUserID')
    console.log(userId);

  }

}
