import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import * as helpers from './helper';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  userForm: FormGroup;
  users;
  selectedUser;
  newUser = true;
  changedUser = false;

  constructor(private searchService: SearchService,
              private formBuilder: FormBuilder,
              private adminService: AdminService) {
              }

  ngOnInit() {
    this.refreshUserList();
    this.userForm = this.formBuilder.group({
      id: '',
      username: '',
      password: '',
      dateOfBirth: '',
      dateOfFirstLogin: '',
      dateOfNextNotification: '',
      information: '',
      role: ''
    });
  }

  refreshUserList() {
    this.searchService.getUsers().subscribe(
      data => {
        this.users = data;
      }
    );
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
    const activeUser = this.selectedUser;
    const id = activeUser.id;
    const username = activeUser.username;
    const password = activeUser.password;
    const dateOfBirth = activeUser.dateOfBirth;
    const dateOfFirstLogin = activeUser.dateOfFirstLogin;
    const dateOfNextNotification = activeUser.dateOfNextNotification;
    const information = activeUser.information;
    const role = activeUser.role;

    helpers.changeInputValue(
            username,
            dateOfBirth,
            dateOfFirstLogin,
            dateOfNextNotification,
            password,
            information,
            role,
            id);
    event.stopPropagation();
    this.updateForm(username,
      dateOfBirth,
      dateOfFirstLogin,
      dateOfNextNotification,
      password,
      information,
      role,
      id);
      this.newUser = false;
      this.changedUser = true;
      this.refreshUserList();
  }

  updateForm(username, dateOfBirth, dateOfFirstLogin, dateOfNextNotification, password, information, role, id) {
    const formValue = this.userForm.value;
    formValue.id = id;
    formValue.username = username;
    formValue.password = password;
    formValue.dateOfBirth = dateOfBirth;
    formValue.dateOfFirstLogin = dateOfFirstLogin;
    formValue.dateOfNextNotification = dateOfNextNotification;
    formValue.information = information;
    formValue.role = role;
    console.log(`${formValue.username} was selected`);
    }

  createUser() {
    this.adminService.createUser(this.userForm.value);
    this.toDefault();
  }

  editUser() {
    this.adminService.editUser(this.selectedUser.id, this.userForm.value);
    this.toDefault();
  }

  deleteUser() {
    this.adminService.deleteUser(this.selectedUser.id);
    this.toDefault();
  }

  toDefault() {
    helpers.resetForm();
    this.newUser = true;
    this.changedUser = false;
    this.refreshUserList();
  }
}
