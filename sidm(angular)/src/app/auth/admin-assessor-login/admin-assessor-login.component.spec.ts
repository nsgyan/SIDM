import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssessorLoginComponent } from './admin-assessor-login.component';

describe('AdminAssessorLoginComponent', () => {
  let component: AdminAssessorLoginComponent;
  let fixture: ComponentFixture<AdminAssessorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssessorLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssessorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
