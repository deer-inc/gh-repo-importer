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
    issues(first:$first, states:$states, after:$after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        state
        assignees(first:100) {
          nodes {
            name
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
