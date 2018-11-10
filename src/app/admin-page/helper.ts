export function changeInputValue(username, dateOfBirth, dateOfFirstLogin, dateOfNextNotification) {
    const name = document.querySelector('#name') as HTMLInputElement;
    const birthday = document.querySelector('#birthday') as HTMLInputElement;
    const dateOfLogin = document.querySelector('#dateOfLogin') as HTMLInputElement;
    const dateOfNotification = document.querySelector('#dateOfNotification') as HTMLInputElement;

    name.value = username;
    birthday.value = dateOfBirth;
    dateOfLogin.value = dateOfFirstLogin;
    dateOfNotification.value = dateOfNextNotification;
}
