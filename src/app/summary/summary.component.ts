import { Component, OnInit, Input } from '@angular/core';
import { Issue, AssignableUser } from '../github.service';

interface Summary {
  [propName: string]: {
    totalCost: number;
  };
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit {
  @Input() issues: Issue[];
  @Input() users: AssignableUser[];

  summary: Summary = {};

  constructor() {}

  ngOnInit() {
    this.buildSummary();
  }

  getTotalCost(user) {
    return this.issues
      .filter(issue => {
        return issue.assignees.nodes.find(assignee => {
          return assignee.login === user.login;
        });
      })
      .map(issue => {
        const cost = issue.title.match(/- (\d(?:\d+|\d?\.\d)?)H/)
        return cost ? +cost[1] : 0;
      })
      .reduce((acc, value) => acc + value, 0);
  }

  buildSummary() {
    this.users.forEach(user => {
      this.summary[user.login] = {
        totalCost: this.getTotalCost(user)
      };
    });

    console.log(this.summary);
  }
}
