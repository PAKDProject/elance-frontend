import { TestBed } from '@angular/core/testing';

import { FeatureToggling } from './feature-toggling.component';

describe('FeatureTogglingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeatureToggling = TestBed.get(FeatureToggling);
    expect(service).toBeTruthy();
  });
});
