import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputsComponent } from './inputs/inputs.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ForgetPsswordComponent } from './forget-pssword/forget-pssword.component';

const appRoutes: Routes = [
  {path: '', component: AuthorizationComponent},
  {path: 'forgetPassword', component: ForgetPsswordComponent},
  {path: 'input', component: InputsComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    InputsComponent,
    AuthorizationComponent,
    ForgetPsswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
