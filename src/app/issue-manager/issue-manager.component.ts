import { Component, OnInit } from '@angular/core';
import { GitHubService, Issue, AssignableUser } from '../github.service';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-issue-manager',
  templateUrl: './issue-manager.component.html',
  styleUrls: ['./issue-manager.component.scss']
})
export class IssueManagerComponent implements OnInit {

  issues: Issue[];
  assignableUsers: AssignableUser[];
  isLoading: boolean;

  constructor(
    private gitHubService: GitHubService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  getIssues(value) {
    this.issues = [];
    this.fetchIssues(value);
    this.isLoading = true;
  }

  fetchIssues(value) {
    this.gitHubService.getIssues(value).pipe(first()).toPromise()
      .then(result => {
        this.issues = this.issues.concat(result.data.repository.issues.nodes);
        this.assignableUsers = result.data.repository.assignableUsers.nodes;

        if (result.data.repository.issues.pageInfo.hasNextPage) {
          const setting = Object.assign({}, value);
          setting.after = result.data.repository.issues.pageInfo.endCursor;
          this.fetchIssues(setting);
        } else {
          this.isLoading = false;
          this.snackBar.open('Issueを取得しました', null, {
            duration: 2000
          });
        }
      })
      .catch(error => {
        console.error(error);
        let msg = '';

        if (/resolve to a Repository/.test(error)) {
          msg = 'リポジトリが存在しません';
        } else if (/resolve to a User/.test(error)) {
          msg = 'オーナーが存在しません';
        } else if (/Auth/.test(error)) {
          msg = 'アクセストークンを確認してください';
        }
        this.snackBar.open(msg, null, {
          duration: 2000
        });
      });
  }

}
