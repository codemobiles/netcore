import { TestBed } from '@angular/core/testing';

import { NetworkServiceService } from './network-service.service';

describe('NetworkServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkServiceService = TestBed.get(NetworkServiceService);
    expect(service).toBeTruthy();
  });
});
