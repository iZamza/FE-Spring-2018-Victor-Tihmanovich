import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor() { }

    currentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}
