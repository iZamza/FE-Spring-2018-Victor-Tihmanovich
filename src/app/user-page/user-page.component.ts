import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from '../validators/name.validator';
import { birthdayDateValidator } from '../validators/birthdayDate.validator';
import { loginDateValidator } from '../validators/loginDate.validator';
import { notificationDateValidator } from '../validators/notificationDate.validator';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  user;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userService.getAll().pipe(first()).subscribe(user => {
      this.user = user;
    });
    const minAge = 18;
    const maxAge = 65;
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required, nameValidator],
      birthday: ['', [Validators.required, birthdayDateValidator('/')]],
      dateOfLogin: ['', [Validators.required, loginDateValidator(' ')]],
      dateOfNotification: ['', [Validators.required, notificationDateValidator('-')]]
    });
  }

  onSubmit() {

    this.submitted = true;
    if (this.userForm.invalid) {
    return;
    }
    const validInfo = this.userForm.value;
    this.user = {
    'id' : this.user.id,
    'username': validInfo.name,
    'dateOfBirth': validInfo.birthday,
    'dateOfFirstLogin': validInfo.dateOfLogin,
    'dateOfNextNotification': validInfo.dateOfNotification,
    'information': this.user.information};
  }
}
