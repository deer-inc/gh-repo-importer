import { TestBed } from '@angular/core/testing';

import { OctkitService } from './octkit.service';

describe('OctkitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OctkitService = TestBed.get(OctkitService);
    expect(service).toBeTruthy();
  });
});
