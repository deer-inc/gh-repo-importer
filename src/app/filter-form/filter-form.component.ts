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
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      url: ['', Validators.required],
      owner: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      this.form.patchValue(params);
      if (params.from) {
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
