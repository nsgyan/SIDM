import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssessorComponent } from './add-assessor.component';

describe('AddAssessorComponent', () => {
  let component: AddAssessorComponent;
  let fixture: ComponentFixture<AddAssessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
