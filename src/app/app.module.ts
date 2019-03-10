import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { ClipboardModule } from 'ngx-clipboard';

import { IssueTableComponent } from './issue-table/issue-table.component';
import { HeaderComponent } from './header/header.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { IssueManagerComponent } from './issue-manager/issue-manager.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PolicyComponent } from './policy/policy.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { SummaryComponent } from './summary/summary.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { CalculationSheetComponent } from './calculation-sheet/calculation-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    IssueTableComponent,
    HeaderComponent,
    TutorialComponent,
    IssueManagerComponent,
    PolicyComponent,
    FilterFormComponent,
    SummaryComponent,
    UserGuideComponent,
    CalculationSheetComponent
  ],
  imports: [
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    GraphQLModule,
    ClipboardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PolicyComponent,
    CalculationSheetComponent
  ]
})
export class AppModule {}
