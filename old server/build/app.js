"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('rootpath')();
const express = require("express");
const bodyParser = require("body-parser");
const delay = require('express-delay');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(delay(1000));
app.use((_, response, next) => {
    response.header('Content-Type', 'application/json');
    next();
});
app.use('/users', require('./users/users.controller'));
let users = require('./users/users.json');
const findUser = (request) => {
    return users.find((user) => user.id === request.params.id);
};
const userNotFoundError = (response) => {
    response.statusCode = 404;
    response.send('There is no users with such id!');
};
app.get('/users', (_, response) => {
    response.send(users);
});
app.get('/users/:id', (request, response) => {
    const user = findUser(request);
    if (!user) {
        userNotFoundError(response);
    }
    else {
        response.send(user);
    }
});
app.post('/users/add', (request, response) => {
    const newUser = request.body;
    console.log(newUser);
    users.push(newUser);
    response.send(newUser);
});
app.put('/users/:id', (request, response) => {
    const user = findUser(request);
    if (!user) {
        userNotFoundError(response);
    }
    else {
        const userIndex = users.findIndex((user) => user.id === request.params.id);
        users[userIndex] = request.body;
        response.send(users[userIndex]);
    }
});
app.delete('/users/:id', (request, response) => {
    const user = findUser(request);
    if (!user) {
        userNotFoundError(response);
    }
    else {
        users = users.filter((user) => user.id !== request.params.id);
        response.send(users);
    }
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
//# sourceMappingURL=app.js.map