import gql from 'graphql-tag';

export const ISSUE_LIST = gql`query($owner:String!, $name:String!, $first:Int, $states:[IssueState!], $after:String) {
  rateLimit {
    resetAt
    cost
		nodeCount
    remaining
    limit
  }
	repository(owner:$owner, name:$name) {
    assignableUsers(first:100) {
      nodes {
        login
      }
    }
    issues(first:$first, states:$states, after:$after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        number
        title
        state
        url
        assignees(first:100) {
          nodes {
            login
          }
        }
        labels(first:100) {
          nodes {
            name
          }
        }
      }
    }
  }
}`;


export const LIMIT = gql`query {
  rateLimit {
    resetAt
    cost
    nodeCount
    remaining
    limit
  }
}`;
