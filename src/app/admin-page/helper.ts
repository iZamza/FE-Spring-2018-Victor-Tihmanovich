export function changeInputValue(username, dateOfBirth, dateOfFirstLogin, dateOfNextNotification, password, information, role, id) {
    const name = document.querySelector('#name') as HTMLInputElement;
    const birthday = document.querySelector('#birthday') as HTMLInputElement;
    const dateOfLogin = document.querySelector('#dateOfLogin') as HTMLInputElement;
    const dateOfNotification = document.querySelector('#dateOfNotification') as HTMLInputElement;
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    const informationInput = document.querySelector('#information') as HTMLInputElement;
    const roleInput = document.querySelector('#role') as HTMLInputElement;
    const idInput = document.querySelector('#id') as HTMLInputElement;

    name.value = username;
    birthday.value = dateOfBirth;
    dateOfLogin.value = dateOfFirstLogin;
    dateOfNotification.value = dateOfNextNotification;
    passwordInput.value = password;
    informationInput.value = information;
    roleInput.value = role;
    idInput.value = id;
}

export function resetForm() {
    const form = document.querySelector('#adminForm') as HTMLFormElement;
    form.reset();
}
