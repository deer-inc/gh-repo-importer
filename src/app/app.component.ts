import { Component } from '@angular/core';
import { OctkitService } from './octkit.service';
import { MatSnackBar } from '@angular/material';
import {
  IssuesListForRepoResponse,
  IssuesListForRepoResponseItem,
  Response,
  IssuesListForRepoParams
} from '@octokit/rest';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'github-issue-manager';
  issues: IssuesListForRepoResponseItem[];
  tokenField: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(40),
    Validators.minLength(40)
  ]);
  form: FormGroup;
  lastParamas = this.octkitService.loadStorage('issueParams');
  lastToken = localStorage.token;

  constructor(
    private octkitService: OctkitService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
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

    if (this.lastParamas) {
      this.form.patchValue(this.lastParamas);
    }

    if (this.lastToken) {
      this.tokenField.patchValue(this.lastToken);
      this.initOctokit(this.lastToken);
    }
  }

  initOctokit(token: string) {
    if (this.tokenField.valid) {
      this.octkitService.initOctokit(token);
    }
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

    this.octkitService
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
