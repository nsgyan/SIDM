import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorHeaderComponent } from './assessor-header.component';

describe('AssessorHeaderComponent', () => {
  let component: AssessorHeaderComponent;
  let fixture: ComponentFixture<AssessorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
