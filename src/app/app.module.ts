import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { HeaderComponent } from './header/header.component';
import { IssueManagerComponent } from './issue-manager/issue-manager.component';
import { PolicyComponent } from './policy/policy.component';
import { SharedModule } from './shared/shared.module';
import { TutorialComponent } from './tutorial/tutorial.component';
import { UserGuideComponent } from './user-guide/user-guide.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TutorialComponent,
    IssueManagerComponent,
    PolicyComponent,
    FilterFormComponent,
    UserGuideComponent,
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
  ]
})
export class AppModule {}
