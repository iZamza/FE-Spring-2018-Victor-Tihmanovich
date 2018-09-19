"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
let users = require('./users.json');
const app = express();
app.use(bodyParser.json());
app.use((_, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
});
app.get('/users', (_, res) => {
    res.send(users);
});
app.get('/users/:id', (req, res) => {
    let result = users.find(user => user.id == req.params.id);
    if (!result) {
        res.status = 404;
        res.send('There is no user with such id');
    }
    else {
        res.send(result);
    }
});
app.post('/users/add', (req, res) => {
    let newUser = req.body;
    users.push(newUser);
    res.send(newUser);
});
app.put('/users/:id', (req, res) => {
    let currentUser = users.find(user => user.id == req.params.id);
    if (!currentUser) {
        res.statusCode = 404;
        res.send('There is no user with such id');
    }
    else {
        let userIndex = users.indexOf(currentUser);
        users[userIndex] = req.body;
        res.send(users[userIndex]);
    }
});
app.delete('/users/:id', (req, res) => {
    let currentUser = users.find(user => user.id == req.params.id);
    if (!currentUser) {
        res.status = 404;
        res.send('There is no user with such id');
    }
    else {
        let userIndex = users.indexOf(currentUser);
        users = users.filter(user => user !== users[userIndex]);
        res.send(users);
    }
});
app.listen(8888);
//# sourceMappingURL=app.js.map