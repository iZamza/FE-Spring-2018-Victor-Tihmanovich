let users = require('./users.json');

module.exports = {
    authenticate,
    getAll
};

let currentUser;

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
       currentUser = user;
       return user;
    }
}

async function getAll() {
    const user = users.find(u => u.id === currentUser.id);
    if(user){
        return user;
    }   
}
