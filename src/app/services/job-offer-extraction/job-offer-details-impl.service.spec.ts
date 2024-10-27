import { TestBed } from '@angular/core/testing';

import { JobOfferDetailsImplService } from './job-offer-details-impl.service';

describe('JobOfferDetailsImplService', () => {
  let service: JobOfferDetailsImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobOfferDetailsImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
