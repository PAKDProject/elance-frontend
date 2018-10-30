import { TestBed } from '@angular/core/testing';

import { FeatureTogglingService } from './feature-toggling.service';

describe('FeatureTogglingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeatureTogglingService = TestBed.get(FeatureTogglingService);
    expect(service).toBeTruthy();
  });
});
