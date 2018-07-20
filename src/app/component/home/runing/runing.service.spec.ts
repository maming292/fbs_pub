import { TestBed, inject } from '@angular/core/testing';

import { RuningService } from './runing.service';

describe('RuningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RuningService]
    });
  });

  it('should be created', inject([RuningService], (service: RuningService) => {
    expect(service).toBeTruthy();
  }));
});
