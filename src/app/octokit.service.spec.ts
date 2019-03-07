import { TestBed } from '@angular/core/testing';

import { OctokitService } from './octokit.service';

describe('OctkitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OctkitService = TestBed.get(OctokitService);
    expect(service).toBeTruthy();
  });
});
