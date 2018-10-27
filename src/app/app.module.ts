import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputsComponent } from './inputs/inputs.component';
import { BasicAuthInterceptor, ErrorInterceptor } from './helpers';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ForgetPsswordComponent } from './forget-pssword/forget-pssword.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './guards';

const appRoutes: Routes = [
  {path: '', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'forgetPassword', component: ForgetPsswordComponent},
  {path: 'input', component: InputsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    InputsComponent,
    AuthorizationComponent,
    ForgetPsswordComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
