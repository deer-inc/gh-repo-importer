import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OctokitService, Issue } from '../octokit.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-issue-manager',
  templateUrl: './issue-manager.component.html',
  styleUrls: ['./issue-manager.component.scss']
})
export class IssueManagerComponent implements OnInit {

  issues: Issue[];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private octokitService: OctokitService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      owner: ['', Validators.required],
      name: ['', Validators.required],
      milestone: [null],
      states: [null],
      assignee: [null],
      creator: [null],
      mentioned: [null],
      labels: [null],
      sort: ['created'],
      direction: ['desc'],
      since: [null],
      first: [100, Validators.max(100)],
      page: [1]
    });

    if (this.octokitService.lastParamas) {
      this.form.patchValue(this.octokitService.lastParamas);
    }
  }

  ngOnInit() {
  }

  getIssues() {
    this.octokitService.getIssues(this.form.value).subscribe(result => {
      this.issues = result.data.repository.issues.nodes;
      this.snackBar.open('Issueを取得しました', null, {
        duration: 2000
      });
    });
  }

}
