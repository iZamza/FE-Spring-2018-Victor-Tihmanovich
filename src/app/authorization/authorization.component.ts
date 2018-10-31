import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit {
  autharizationForm: FormGroup;
  isLoading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    public translate: TranslateService) {
    translate.addLangs(['en', 'rus']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.autharizationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authenticationService.logout();
  }

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;

    if (this.autharizationForm.invalid) {
      return;
    }

    this.authenticationService.login(this.autharizationForm.controls.username.value, this.autharizationForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
          this.isLoading = false;
        });
  }
}
