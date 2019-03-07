import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { IssueTableComponent } from './issue-table/issue-table.component';
import { HeaderComponent } from './header/header.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { IssueManagerComponent } from './issue-manager/issue-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    IssueTableComponent,
    HeaderComponent,
    TutorialComponent,
    IssueManagerComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
