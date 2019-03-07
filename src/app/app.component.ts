import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { OctokitService } from './octokit.service';
import { MatDialog } from '@angular/material';
import { PolicyComponent } from './policy/policy.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authState$: Observable<boolean> = this.authService.authState$;

  constructor(
    private authService: AuthService,
    private octokitService: OctokitService,
    private dialog: MatDialog
  ) {
    this.authState$.subscribe(status => {
      if (status) {
        this.octokitService.initOctokit(
          this.authService.token
        );
      }
    });
  }

  openPoicy() {
    this.dialog.open(PolicyComponent);
  }
}
