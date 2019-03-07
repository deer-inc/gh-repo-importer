import { Injectable } from '@angular/core';
import * as Octokit from '@octokit/rest';

export interface IssueFilter {
  milestone: string;
  state: string;
  assignee: string;
  creator: string;
  mentioned: string;
  labels: string;
  sort: string;
  direction: string;
  since: string;
  per_page: number;
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class OctkitService {
  octokit: Octokit;

  constructor() {}

  saveStorage(key: string, params: object) {
    localStorage[key] = JSON.stringify(params);
  }

  loadStorage(key: string): object {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key]);
    } else {
      return null;
    }
  }

  initOctokit(token: string): void {
    localStorage.token = token;
    this.octokit = new Octokit({
      auth: `token ${token}`
    });
  }

  getIssues(params: Octokit.IssuesListForRepoParams): Promise<Octokit.Response<Octokit.IssuesListForRepoResponse>> {
    this.saveStorage('issueParams', params);

    if (params.since) {
      params.since = new Date(params.since).toISOString();
    }

    return this.octokit.issues.listForRepo(params);
  }
}
