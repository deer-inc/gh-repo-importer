import { Component, OnInit } from '@angular/core';
import { GitHubService } from '../github.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clearCache() {
    localStorage.clear();
  }

}
