import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-assessor',
  templateUrl: './add-assessor.component.html',
  styleUrls: ['./add-assessor.component.css']
})
export class AddAssessorComponent implements OnInit {
  assessorForm=FormGroup
  constructor() { }

  ngOnInit(): void {
  }

}
