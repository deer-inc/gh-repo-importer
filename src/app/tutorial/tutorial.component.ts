import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { OctokitService } from '../octokit.service';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  tokenField: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(40),
    Validators.minLength(40)
  ]);

  constructor(
    private octokitService: OctokitService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  checkToken(token: string) {
    if (this.tokenField.valid) {
      this.authService.checkAuth(token)
        .then(result => {
          this.octokitService.initOctokit(result);
        })
        .catch(result => {
          this.snackBar.open('認証に失敗しました', null, {
            duration: 2000
          });
        });
    }
  }
}
