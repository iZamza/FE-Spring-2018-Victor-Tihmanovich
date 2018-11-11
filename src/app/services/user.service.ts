import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    currentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    editUser(id, object) {
        return this.http.post <any> ('http://localhost:4000/users/edit', {id, object})
        .subscribe(res => console.log(res));
      }
}
