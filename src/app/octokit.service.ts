import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Observable } from 'rxjs';
import { ISSUE_LIST } from './query';
import { ApolloQueryResult } from 'apollo-client';

export interface Issue {
  title: string;
  state: 'OPEN' | 'CLOSED';
  assignees: {
    nodes: {
      name: string;
    }[]
  };
  labels: {
    nodes: {
      name: string;
    }[]
  };
}

export interface Response {
  rateLimit: {
    resetAt: string;
    cost: number;
    nodeCount: number;
    remaining: number;
    limit: number;
  };
  repository: {
    issues: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
      nodes: Issue[];
    }
  };
}

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
  lastParamas: object;
  lastToken: string;

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
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
    const http = this.httpLink.create({
      uri: 'https://api.github.com/graphql',
    });

    const auth = setContext((_, { headers }) => {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    });

    this.apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache(),
    });
  }

  clearCache() {
    localStorage.issueParams = null;
  }

  getIssues(params): Observable<ApolloQueryResult<Response>> {
    this.setDataToStorage('issueParams', params);
    return this.apollo.watchQuery<Response>({
      query: ISSUE_LIST,
      variables: {
        owner: params.owner,
        name: params.name,
        first: params.first,
        states: params.states,
        after: null
      }
    }).valueChanges;
  }
}
