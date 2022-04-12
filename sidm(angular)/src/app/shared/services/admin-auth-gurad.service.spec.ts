import { TestBed } from '@angular/core/testing';

import { AdminAuthGuradService } from './admin-auth-gurad.service';

describe('AdminAuthGuradService', () => {
  let service: AdminAuthGuradService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthGuradService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
