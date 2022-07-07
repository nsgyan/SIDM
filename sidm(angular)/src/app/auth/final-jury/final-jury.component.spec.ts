import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalJuryComponent } from './final-jury.component';

describe('FinalJuryComponent', () => {
  let component: FinalJuryComponent;
  let fixture: ComponentFixture<FinalJuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalJuryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalJuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
