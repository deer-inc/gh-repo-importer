import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialComponent } from './tutorial.component';
import { SharedModule } from '../shared/shared.module';
import { GitHubService } from '../github.service';

describe('TutorialComponent', () => {
  let component: TutorialComponent;
  let fixture: ComponentFixture<TutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialComponent ],
      imports: [
        SharedModule
      ],
      providers: [
        {provide: GitHubService, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
