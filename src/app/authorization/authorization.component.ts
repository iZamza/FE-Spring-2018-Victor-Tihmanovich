import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { User } from '../user';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  providers: [HttpService],
})

export class AuthorizationComponent implements OnInit {
  title = 'hello!';
  users: User[] = [];
  constructor(private httpService: HttpService) {  }

  ngOnInit() {
    this.httpService.getData().subscribe((data: User) => this.users = data['userList']);
  }

}
