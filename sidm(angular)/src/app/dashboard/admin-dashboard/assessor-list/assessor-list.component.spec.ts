import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorListComponent } from './assessor-list.component';

describe('AssessorListComponent', () => {
  let component: AssessorListComponent;
  let fixture: ComponentFixture<AssessorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
