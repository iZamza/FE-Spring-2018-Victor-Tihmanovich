import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from './validators/name.validator';
import { rangeValidator } from './validators/range.validator';
import { numberValidator } from './validators/number.validator';
import { birthdayDateValidator } from './validators/birthdayDate.validator';
import { loginDateValidator } from './validators/loginDate.validator';
import { notificationDateValidator } from './validators/notificationDate.validator';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const minAge = 18;
    const maxAge = 65;
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required, nameValidator],
      age: ['', [Validators.required, rangeValidator(minAge, maxAge), numberValidator]],
      birthday: ['', [Validators.required, birthdayDateValidator('/')]],
      dateOfLogin: ['', [Validators.required, loginDateValidator(' ')]],
      dateOfNotification: ['', [Validators.required, notificationDateValidator('-')]]
    });
  }

  onSubmit() {
    const greeting = document.querySelector('.greeting-form') as HTMLElement;
    this.submitted = true;
    if (this.userForm.invalid) {
    return;
    }
    const validInfo = this.userForm.value;
    const nameVal = document.querySelector('.name-value');
    const ageVal = document.querySelector('.age-value');
    const dateOfBrdtVAl = document.querySelector('.date-of-birdth-value');
    const dateOfLogVAl = document.querySelector('.date-of-login-value');
    const dateOfNtfVAl = document.querySelector('.date-of-notification-value');

    greeting.style.opacity = '1';
    nameVal.innerHTML = validInfo.name;
    ageVal.innerHTML = validInfo.age;
    dateOfBrdtVAl.innerHTML = validInfo.birthday;
    dateOfLogVAl.innerHTML = validInfo.dateOfLogin;
    dateOfNtfVAl.innerHTML = validInfo.dateOfNotification;
  }

  Changing() {
    const greeting = document.querySelector('.greeting-form') as HTMLElement;
    greeting.style.opacity = '0';
  }

}
