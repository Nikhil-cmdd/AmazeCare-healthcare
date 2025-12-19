import { TestBed } from '@angular/core/testing';

import { HospitalService } from './hospital';

describe('HospitalService', () => {
  let service: HospitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
