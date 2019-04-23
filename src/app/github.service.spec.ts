import { TestBed } from '@angular/core/testing';

import { GitHubService } from './github.service';
import { HttpClientModule } from '@angular/common/http';

describe('GitHubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', () => {
    const service: GitHubService = TestBed.get(GitHubService);
    expect(service).toBeTruthy();
  });
});
