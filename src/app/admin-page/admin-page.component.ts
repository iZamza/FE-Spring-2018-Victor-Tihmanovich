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
  constructor(private searchService: SearchService,
              private formBuilder: FormBuilder,
              private adminService: AdminService) {}

  ngOnInit() {
    this.searchService.getUsers().subscribe(
      data => {
        this.users = data;
      }
    );
    this.userForm = this.formBuilder.group({
      name: '',
      birthday: '',
      dateOfLogin: '',
      dateOfNotification: ''
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

  createUser() {
    this.adminService.createUser(this.userForm.value);
  }

  editUser() {
    this.adminService.editUser(this.userForm.value);
  }

  deleteUser() {
    this.adminService.deleteUser(this.selectedUser.id);
  }
}
