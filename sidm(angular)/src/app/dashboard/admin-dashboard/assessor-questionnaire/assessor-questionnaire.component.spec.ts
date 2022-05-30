import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorQuestionnaireComponent } from './assessor-questionnaire.component';

describe('AssessorQuestionnaireComponent', () => {
  let component: AssessorQuestionnaireComponent;
  let fixture: ComponentFixture<AssessorQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessorQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
