import { TestBed } from '@angular/core/testing';

import { RealisationTopServiceService } from './realisation-top-service.service';

describe('RealisationTopServiceService', () => {
  let service: RealisationTopServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealisationTopServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
