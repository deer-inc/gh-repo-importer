import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { IssueTableComponent } from './issue-table/issue-table.component';
import { HeaderComponent } from './header/header.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { IssueManagerComponent } from './issue-manager/issue-manager.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PolicyComponent } from './policy/policy.component';

@NgModule({
  declarations: [
    AppComponent,
    IssueTableComponent,
    HeaderComponent,
    TutorialComponent,
    IssueManagerComponent,
    PolicyComponent
  ],
  imports: [
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PolicyComponent]
})
export class AppModule {}
