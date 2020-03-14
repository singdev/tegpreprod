import { TestBed } from '@angular/core/testing';

import { RealisationVolumeService } from './realisation-volume.service';

describe('RealisationVolumeService', () => {
  let service: RealisationVolumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealisationVolumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
