import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { renderUser } from '../helpers/renderUser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users;
  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.getUsers().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  toggleDrop() {
    document.querySelector('.myDropper').classList.toggle('show');
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
    renderUser(this.users[event.target.parentElement.dataset.index]);
    event.stopPropagation();
  }
}
