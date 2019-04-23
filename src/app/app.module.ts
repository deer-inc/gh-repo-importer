import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CalculationSheetComponent } from './calculation-sheet/calculation-sheet.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { GraphQLModule } from './graphql.module';
import { HeaderComponent } from './header/header.component';
import { IssueManagerComponent } from './issue-manager/issue-manager.component';
import { IssueTableComponent } from './issue-table/issue-table.component';
import { PolicyComponent } from './policy/policy.component';
import { SharedModule } from './shared/shared.module';
import { SummaryComponent } from './summary/summary.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { UserGuideComponent } from './user-guide/user-guide.component';


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
    HttpClientModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PolicyComponent,
    CalculationSheetComponent
  ]
})
export class AppModule {}
