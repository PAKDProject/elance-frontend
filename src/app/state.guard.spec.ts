import { TestBed, async, inject } from '@angular/core/testing';

import { StateGuard } from './state.guard';

describe('RegisteredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateGuard]
    });
  });

  it('should ...', inject([StateGuard], (guard: StateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
