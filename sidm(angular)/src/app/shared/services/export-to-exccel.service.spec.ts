import { TestBed } from '@angular/core/testing';

import { ExportToExccelService } from './export-to-exccel.service';

describe('ExportToExccelService', () => {
  let service: ExportToExccelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportToExccelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
