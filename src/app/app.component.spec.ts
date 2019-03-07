import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IssueManagerComponent } from './issue-manager/issue-manager.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { SharedModule } from './shared/shared.module';
import { IssueTableComponent } from './issue-table/issue-table.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        IssueManagerComponent,
        TutorialComponent,
        IssueTableComponent,
      ],
      imports: [
        SharedModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
