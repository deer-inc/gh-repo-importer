import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GitHubService } from '../github.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {

  @Output() submitData: EventEmitter<object> = new EventEmitter();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gitHubService: GitHubService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      owner: ['deer-inc', Validators.required],
      name: ['github-manager-example-repository', Validators.required],
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

    if (this.gitHubService.lastParamas) {
      this.form.patchValue(this.gitHubService.lastParamas);
    }

    this.route.queryParams.subscribe(params => {
      this.form.patchValue(params);
      if (params.owner && params.name) {
        this.onSubmit();
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitData.emit(this.form.value);
  }

}
