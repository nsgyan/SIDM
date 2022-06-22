import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssessorDashBoardComponent } from './admin-assessor-dash-board.component';

describe('AdminAssessorDashBoardComponent', () => {
  let component: AdminAssessorDashBoardComponent;
  let fixture: ComponentFixture<AdminAssessorDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssessorDashBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssessorDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
