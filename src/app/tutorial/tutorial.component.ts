import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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
  ], [
    this.tokenValidator()
  ]);

  constructor(
    private githubService: GitHubService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() { }

  checkToken(token: string) {
    if (this.tokenField.valid) {
      this.githubService.setToken(token);
      this.authService.login(token);
    }
  }

  tokenValidator(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      try {
        await this.githubService.checkToken(control.value);
        return null;
      } catch (e) {
        return {
          tokenError: e.message
        };
      }
    };
  }
}
