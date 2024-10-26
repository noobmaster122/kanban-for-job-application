import { TestBed } from '@angular/core/testing';

import { ChromeConnectionService } from './chrome-connection.service';

describe('ChromeConnectionService', () => {
  let service: ChromeConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChromeConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
