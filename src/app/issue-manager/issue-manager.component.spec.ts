import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueManagerComponent } from './issue-manager.component';

describe('IssueManagerComponent', () => {
  let component: IssueManagerComponent;
  let fixture: ComponentFixture<IssueManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueManagerComponent ]
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
