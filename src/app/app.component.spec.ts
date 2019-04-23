import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { IssueManagerComponent } from './issue-manager/issue-manager.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { SharedModule } from './shared/shared.module';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { GitHubService } from './github.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        IssueManagerComponent,
        TutorialComponent,
        FilterFormComponent,
        UserGuideComponent,
      ],
      imports: [
        SharedModule
      ],
      providers: [
        {provide: GitHubService, useValue: {}}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
