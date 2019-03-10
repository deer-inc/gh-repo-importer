import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFormComponent } from './filter-form.component';
import { SharedModule } from '../shared/shared.module';
import { GitHubService } from '../github.service';
import { RouterModule } from '@angular/router';

describe('FilterFormComponent', () => {
  let component: FilterFormComponent;
  let fixture: ComponentFixture<FilterFormComponent>;
  let gitHubServiceStub: Partial<GitHubService>;
  let gitHubService;

  beforeEach(async(() => {
    gitHubServiceStub = {
      lastParamas: null,
      lastToken: null,
      token: null
    };

    TestBed.configureTestingModule({
      declarations: [ FilterFormComponent ],
      imports: [
        SharedModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: GitHubService, useValue: gitHubServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(FilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    gitHubService = fixture.debugElement.injector.get(GitHubService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
