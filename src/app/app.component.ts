import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { GitHubService } from './github.service';
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
    private githubService: GitHubService,
    private dialog: MatDialog
  ) {
    const token = this.authService.checkAuth();

    if (token) {
      this.githubService.setToken(token);
    }
  }

  openPoicy() {
    this.dialog.open(PolicyComponent);
  }
}
