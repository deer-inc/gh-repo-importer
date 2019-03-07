import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesListForRepoResponseItem, Response, IssuesListForRepoParams, IssuesListForRepoResponse } from '@octokit/rest';
import { OctokitService } from '../octokit.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-issue-manager',
  templateUrl: './issue-manager.component.html',
  styleUrls: ['./issue-manager.component.scss']
})
export class IssueManagerComponent implements OnInit {

  issues: IssuesListForRepoResponseItem[];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private octokitService: OctokitService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      owner: ['', Validators.required],
      repo: ['', Validators.required],
      milestone: [null],
      state: ['open'],
      assignee: [null],
      creator: [null],
      mentioned: [null],
      labels: [null],
      sort: ['created'],
      direction: ['desc'],
      since: [null],
      per_page: [100, Validators.max(100)],
      page: [1]
    });

    if (this.octokitService.lastParamas) {
      this.form.patchValue(this.octokitService.lastParamas);
    }
  }

  ngOnInit() {
  }

  private buildParams(base) {
    const params = {
      owner: '',
      repo: ''
    };

    Object.keys(base).forEach(key => {
      if (base[key]) {
        params[key] = base[key];
      }
    });

    return params;
  }

  getIssues() {
    const params: IssuesListForRepoParams = this.buildParams(this.form.value);

    this.octokitService
      .getIssues(params)
      .then((result: Response<IssuesListForRepoResponse>) => {
        this.issues = result.data;
        this.snackBar.open('Issueを取得しました', null, {
          duration: 2000
        });
      })
      .catch(err => {
        console.error(err);
        this.snackBar.open(
          '取得に失敗しました。トークンをご確認ください',
          null,
          {
            duration: 2000
          }
        );
      });
  }

}
