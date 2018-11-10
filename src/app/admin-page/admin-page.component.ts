import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from '../validators/name.validator';
import { birthdayDateValidator } from '../validators/birthdayDate.validator';
import { loginDateValidator } from '../validators/loginDate.validator';
import { notificationDateValidator } from '../validators/notificationDate.validator';
import * as helpers from './helper';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  users;
  selectedUser;
  constructor(private searchService: SearchService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchService.getUsers().subscribe(
      data => {
        this.users = data;
      }
    );
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required, nameValidator],
      birthday: ['', [Validators.required, birthdayDateValidator('/')]],
      dateOfLogin: ['', [Validators.required, loginDateValidator(' ')]],
      dateOfNotification: ['', [Validators.required, notificationDateValidator('-')]]
    });
  }

  filterUser() {
    const input = document.querySelector('#filterInput') as HTMLInputElement;
    const filterData = input.value.toUpperCase();
    const userFromList = document.querySelectorAll('.user-from-list');
    const userArray = Array.from(userFromList);
    userArray.forEach((li: HTMLElement) => {
      if (li.innerHTML.toUpperCase().indexOf(filterData) > -1) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    });
  }

  activeUser(event) {
    this.selectedUser = this.users[event.target.parentElement.dataset.index];
    helpers.changeInputValue(this.selectedUser.username,
            this.selectedUser.dateOfBirth,
            this.selectedUser.dateOfFirstLogin,
            this.selectedUser.dateOfNextNotification);
    event.stopPropagation();
    const name = this.selectedUser.username;
    const birthday = this.selectedUser.dateOfBirth;
    const login = this.selectedUser.dateOfFirstLogin;
    const notification = this.selectedUser.dateOfNextNotification;
    this.userForm.value.name = name;
    this.userForm.value.birthday = birthday;
    this.userForm.value.dateOfLogin = login;
    this.userForm.value.dateOfNotification = notification;
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      console.log(this.userForm.value);
      return;
    }
    console.log(this.userForm.value);
    console.log('success');

    // this.authenticationService.login(this.autharizationForm.controls.username.value, this.autharizationForm.controls.password.value)
    //   .subscribe(
    //     data => {
    //       this.router.navigate(['/']);
    //     },
    //     error => {
    //       this.error = error;
    //       this.isLoading = false;
    //     });
  }
  // createUser() {
  //   this.submitted = true;
  //   if (this.userForm.invalid) {
  //     return;
  //   }
  //   alert('created');
  // }

  // editUser() {
  //   this.submitted = true;
  //   if (this.userForm.invalid) {
  //     return;
  //   }
  //   alert('edited');
  // }

  // deleteUser() {
  //   this.submitted = true;
  //   if (this.userForm.invalid) {
  //     return;
  //   }
  // <button type="submit" [disabled]="loading" (submit)='createUser()' class="newBtn">New user</button>
  //         <button type="submit" [disabled]="loading" (submit)='editUser()' class="editBtn">Edit user</button>
  //         <button type="submit" [disabled]="loading" (click)='deleteUser()' class="deleteBtn">Delete user</button>
  //   alert('deleted');
  // }
}
