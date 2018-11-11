import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  createUser (object) {
    return this.http.post('http://localhost:4000/users/add', object)
    .subscribe(res => console.log('User was successfully add'));
  }


  editUser(id, object) {
    return this.http.post <any> ('http://localhost:4000/users/edit', {id, object})
    .subscribe(res => console.log('User was successfully edit'));
  }

  deleteUser(id) {
    return this.http.post <any> ('http://localhost:4000/users/delete', {id})
    .subscribe(res => console.log('User was successfully deleted'));
  }
}



