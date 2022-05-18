import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantFormViewComponent } from './applicant-form-view.component';

describe('ApplicantFormViewComponent', () => {
  let component: ApplicantFormViewComponent;
  let fixture: ComponentFixture<ApplicantFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantFormViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
