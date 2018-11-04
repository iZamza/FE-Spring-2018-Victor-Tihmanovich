import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { InputsComponent } from './inputs/inputs.component';
import { BasicAuthInterceptor, ErrorInterceptor } from './helpers';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ForgetPsswordComponent } from './forget-pssword/forget-pssword.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './guards';
import { LoaderComponent } from './loader/loader.component';
import { SearchUserComponent } from './search-user/search-user.component';

import { UserListModule } from './UserListComponent/user-list.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const appRoutes: Routes = [
  {path: '', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'forgetPassword', component: ForgetPsswordComponent},
  {path: 'input', component: InputsComponent},
  {path: 'search', component: SearchUserComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    InputsComponent,
    AuthorizationComponent,
    ForgetPsswordComponent,
    UserPageComponent,
    LoaderComponent,
    SearchUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    UserListModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
