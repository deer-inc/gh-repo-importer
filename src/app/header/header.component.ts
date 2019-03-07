import { Component, OnInit } from '@angular/core';
import { OctokitService } from '../octokit.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private octkitService: OctokitService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  clearCache() {
    this.octkitService.clearCache();
    this.authService.clearCache();
  }

}
