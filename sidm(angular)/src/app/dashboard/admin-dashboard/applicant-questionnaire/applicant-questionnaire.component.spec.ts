import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantQuestionnaireComponent } from './applicant-questionnaire.component';

describe('ApplicantQuestionnaireComponent', () => {
  let component: ApplicantQuestionnaireComponent;
  let fixture: ComponentFixture<ApplicantQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
