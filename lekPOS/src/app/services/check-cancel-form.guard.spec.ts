import { TestBed, async, inject } from '@angular/core/testing';

import { CheckCancelFormGuard } from './check-cancel-form.guard';

describe('CheckCancelFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckCancelFormGuard]
    });
  });

  it('should ...', inject([CheckCancelFormGuard], (guard: CheckCancelFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
