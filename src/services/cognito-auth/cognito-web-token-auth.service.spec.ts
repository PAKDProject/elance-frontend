import { TestBed } from '@angular/core/testing';

import { CognitoWebTokenAuthService } from './cognito-web-token-auth.service';

describe('CognitoWebTokenAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CognitoWebTokenAuthService = TestBed.get(CognitoWebTokenAuthService);
    expect(service).toBeTruthy();
  });
});
