import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  createUser(object) {
      return this.http.post <any> ('http://localhost:4000/users/add', object);
  }

  editUser(object) {
    return this.http.put <any> ('http://localhost:4000/users/:id', object);
  }

  deleteUser(id) {
    return this.http.delete <any> ('http://localhost:4000/users/:id', id);
  }
}
