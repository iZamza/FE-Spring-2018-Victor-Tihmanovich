import { User } from '../models';

export function renderUser(object: User) {
    document.querySelector('.user-name').innerHTML = object.username;
    document.querySelector('.birthday').innerHTML = object.dateOfBirth;
    document.querySelector('.description').innerHTML = object.information;
    document.querySelector('.date-of-login').innerHTML = object.dateOfFirstLogin;
}
