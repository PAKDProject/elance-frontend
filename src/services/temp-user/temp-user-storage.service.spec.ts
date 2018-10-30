import { TestBed } from '@angular/core/testing';

import { TempUserStorageService } from './temp-user-storage.service';

describe('TempUserStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempUserStorageService = TestBed.get(TempUserStorageService);
    expect(service).toBeTruthy();
  });
});
