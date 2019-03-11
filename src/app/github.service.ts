import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Observable } from 'rxjs';
import { ISSUE_LIST, LIMIT } from './query';
import { ApolloQueryResult } from 'apollo-client';
import { concat } from 'apollo-link';

export interface Issue {
  number: number;
  title: string;
  url: string;
  state: 'OPEN' | 'CLOSED';
  assignees: {
    nodes: {
      login: string;
    }[]
  };
  labels: {
    nodes: {
      name: string;
    }[]
  };
}

export interface AssignableUser {
  login: string;
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
    assignableUsers: {
      nodes: {
        login: string;
      }[]
    };
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
export class GitHubService {
  lastParamas: object;
  lastToken: string;
  token: string;

  authMiddleware = setContext(() => {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    };
  });

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    this.getStorageData();
    this.createAppollo();
  }

  createAppollo() {
    const http = this.httpLink.create({
      uri: 'https://api.github.com/graphql',
    });

    this.apollo.create({
      link: concat(this.authMiddleware, http),
      cache: new InMemoryCache(),
    });
  }

  getStorageData() {
    this.lastParamas = this.getDataFromStorage('issueParams');
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

  setToken(token: string): Observable<any> {
    this.token = token;
    return this.apollo.watchQuery({
      query: LIMIT
    }).valueChanges;
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
        after: params.after
      }
    }).valueChanges;
  }
}
