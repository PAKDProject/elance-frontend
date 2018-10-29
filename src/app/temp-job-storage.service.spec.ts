import { TestBed } from '@angular/core/testing';

import { TempJobStorageService } from './temp-job-storage.service';

describe('TempJobStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempJobStorageService = TestBed.get(TempJobStorageService);
    expect(service).toBeTruthy();
  });
});
