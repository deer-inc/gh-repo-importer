import { TestBed } from '@angular/core/testing';

import { GitHubService } from './github.service';

describe('OctkitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GitHubService = TestBed.get(GitHubService);
    expect(service).toBeTruthy();
  });
});
