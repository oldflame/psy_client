import { TestBed } from '@angular/core/testing';

import { ResultsGuardService } from './results-guard.service';

describe('ResultsGuardService', () => {
  let service: ResultsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
