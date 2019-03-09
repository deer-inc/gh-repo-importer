import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GitHubService } from '../github.service';
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
    private githubService: GitHubService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  checkToken(token: string) {
    if (this.tokenField.valid) {
      this.githubService.setToken(token).subscribe(
        result => {
          this.authService.login(token);
        },
        error => {
          this.snackBar.open('認証に失敗しました', null, {
            duration: 2000
          });
        }
      );
    }
  }
}
