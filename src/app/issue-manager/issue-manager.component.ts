import { Component, OnInit } from '@angular/core';
import { GitHubService, Issue, AssignableUser } from '../github.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-issue-manager',
  templateUrl: './issue-manager.component.html',
  styleUrls: ['./issue-manager.component.scss']
})
export class IssueManagerComponent implements OnInit {

  issues: Issue[];
  assignableUsers: AssignableUser[];

  constructor(
    private gitHubService: GitHubService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  getIssues(value) {
    this.gitHubService.getIssues(value).subscribe(
      result => {
        this.issues = result.data.repository.issues.nodes;
        this.assignableUsers = result.data.repository.assignableUsers.nodes;
        this.snackBar.open('Issueを取得しました', null, {
          duration: 2000
        });
      },
      error => {
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
      }
    );
  }

}
