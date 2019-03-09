import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Issue } from '../github.service';

interface TableIssues extends Issue {
  cost: number;
}

@Component({
  selector: 'app-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.scss']
})
export class IssueTableComponent implements OnInit {
  @Input()
  set issues(issues) {
    this.dataSource.data = issues.map((issue: Issue) => {
      const cost = issue.title.match(/- (\d(?:\d+|\d?\.\d)?)H/);
      return {
        cost: cost ? +cost[1] : 0,
        assignees: issue.assignees.nodes.map(assignee => assignee.login),
        title: issue.title,
        state: issue.state,
        number: issue.number
      };
    });
  }

  displayedColumns: string[] = ['id', 'title', 'assignees', 'cost', 'state'];
  dataSource = new MatTableDataSource<TableIssues>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getTotalCost() {
    return this.dataSource.data
      .map(t => t.cost)
      .reduce((acc, value) => acc + value, 0);
  }
}
