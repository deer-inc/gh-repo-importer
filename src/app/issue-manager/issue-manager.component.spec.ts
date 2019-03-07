import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueManagerComponent } from './issue-manager.component';
import { SharedModule } from '../shared/shared.module';
import { IssueTableComponent } from '../issue-table/issue-table.component';

describe('IssueManagerComponent', () => {
  let component: IssueManagerComponent;
  let fixture: ComponentFixture<IssueManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IssueManagerComponent,
        IssueTableComponent
      ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
