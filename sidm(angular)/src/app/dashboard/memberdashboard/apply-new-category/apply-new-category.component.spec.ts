import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyNewCategoryComponent } from './apply-new-category.component';

describe('ApplyNewCategoryComponent', () => {
  let component: ApplyNewCategoryComponent;
  let fixture: ComponentFixture<ApplyNewCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyNewCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyNewCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
