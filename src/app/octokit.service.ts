import { Injectable } from '@angular/core';
import * as Octokit from '@octokit/rest';
import * as CryptoJS from 'crypto-js';

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
export class OctokitService {
  octokit: Octokit;
  lastParamas: object;
  lastToken: string;

  constructor() {
    this.getStorageData();
  }

  getStorageData() {
    this.lastParamas = this.getDataFromStorage('issueParams');

    if (this.lastToken) {
      this.initOctokit(this.lastToken);
    }
  }

  setDataToStorage(key: string, params: object) {
    localStorage[key] = JSON.stringify(params);
  }

  getDataFromStorage(key: string): object {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key]);
    } else {
      return null;
    }
  }

  initOctokit(token: string): void {
    this.octokit = new Octokit({
      auth: `token ${token}`
    });
  }

  clearCache() {
    localStorage.issueParams = null;
  }

  getIssues(params: Octokit.IssuesListForRepoParams): Promise<Octokit.Response<Octokit.IssuesListForRepoResponse>> {
    this.setDataToStorage('issueParams', params);

    if (params.since) {
      params.since = new Date(params.since).toISOString();
    }

    return this.octokit.issues.listForRepo(params);
  }
}
