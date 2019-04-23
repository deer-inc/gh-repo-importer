import { Component, OnInit } from '@angular/core';
import { GitHubService } from '../github.service';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-issue-manager',
  templateUrl: './issue-manager.component.html',
  styleUrls: ['./issue-manager.component.scss']
})
export class IssueManagerComponent implements OnInit {

  newURL: string;
  isLoading: boolean;

  constructor(
    private gitHubService: GitHubService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() { }

  cloneRepo(value) {
    this.isLoading = true;
    const {url, owner } = value;
    this.gitHubService.importRepo(url, owner)
    .then(result => {
      this.newURL = result;
      this.snackBar.open('複製が完了しました', null, {
        duration: 2000
      });
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
    })
    .finally(() => {
      this.isLoading = false;
    });
  }
}
