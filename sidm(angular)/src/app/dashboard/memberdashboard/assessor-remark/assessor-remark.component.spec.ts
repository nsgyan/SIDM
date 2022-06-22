import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorRemarkComponent } from './assessor-remark.component';

describe('AssessorRemarkComponent', () => {
  let component: AssessorRemarkComponent;
  let fixture: ComponentFixture<AssessorRemarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorRemarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessorRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
