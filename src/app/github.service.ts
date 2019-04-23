import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import * as Octokit from '@octokit/rest';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  lastParamas: object;
  lastToken: string;
  token: string;
  issues = [];

  constructor(
  ) { }

  setToken(token: string) {
    this.token = token;
  }

  private parseURL(url: string): {
    owner: string;
    repo: string;
  } {
    let result = url.replace('https://github.com/', '');
    result = result.replace(/\/$/, '');
    const values = result.split('/');
    return {
      owner: values[0],
      repo: values[1]
    };
  }

  private async clearLabels(octokit, owner, repo) {
    const oldLabels = await octokit.issues.listLabelsForRepo({
      owner,
      repo
    });

    for (const label of oldLabels.data) {
      await octokit.issues.deleteLabel({
        owner,
        repo,
        name: label.name
      });
    }
  }

  private async createLabels(octokit, owner, base) {
    const labels = await octokit.issues.listLabelsForRepo({
      owner: base.owner,
      repo: base.repo
    });

    for (const label of labels.data) {
      await octokit.issues.createLabel({
        owner,
        repo: base.repo,
        name: label.name,
        color: label.color
      });
    }
  }

  private async createIssues(octokit, owner, repo) {
    const issues = await octokit.paginate('GET /repos/:owner/:repo/issues',
      {
        owner: 'octokit',
        repo: 'rest.js'
      }, response => response.data.filter(issue => !issue.pull_request)
    );

    for (const issue of issues) {
      await octokit.issues.create({
        owner,
        repo,
        title: issue.title,
        body: issue.body,
        assignee: owner,
        labels: issue.labels.map(label => label.name),
      });
    }
  }

  private async forkRepo(octokit, owner, base) {
    await octokit.repos.createFork({
      owner: base.owner,
      repo: base.repo
    });

    await octokit.repos.update({
      owner,
      repo: base.repo,
      name: base.repo,
      has_issues: true,
      has_projects: false,
      has_wiki: false,
    });
  }

  async importRepo(url: string, owner: string): Promise<string> {
    const base = this.parseURL(url);
    const octokit = new Octokit({
      auth: `token ${this.token}`
    });

    await this.forkRepo(octokit, owner, base);
    await this.clearLabels(octokit, owner, base.repo);
    await this.createLabels(octokit, owner, base);
    await this.createIssues(octokit, owner, base.repo);

    return `https://github.com/${owner}/${base.repo}/`;
  }

  async checkToken(token: string) {
    try {
      const octokit = new Octokit({
        auth: `token ${token}`
      });
      const user =  await octokit.users.getAuthenticated();

      if (user.headers['x-oauth-scopes'].match('repo')) {
        return token;
      } else {
        throw new Error('APIの権限でリポジトリを許可してください');
      }
    } catch (error) {
      throw error;
    }
  }
}
