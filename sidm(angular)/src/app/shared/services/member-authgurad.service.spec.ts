import { TestBed } from '@angular/core/testing';

import { MemberAuthguradService } from './member-authgurad.service';

describe('MemberAuthguradService', () => {
  let service: MemberAuthguradService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberAuthguradService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
