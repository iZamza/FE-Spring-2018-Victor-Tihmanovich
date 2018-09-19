const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const users = require('./users.json');

app.use(bodyParser.json());

app.get('/users', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    res.set('Content-Type', 'application/json');
    let result = users.find(user => user.id == req.params.id);
    if (result === undefined) {
        res.send('Sorry, not users with such Id');
    }
    else {
        res.send(result);
    }
});

app.post('/users/add', (req, res) => {
    res.set('Content-Type', 'application/json');
    let newId = req.body.newId;
    console.log(newId)
    res.send(newId);
});

app.put('/users/:id', (req, res) => {
    res.set('Content-Type', 'application/json');
    const changedId = users.find(user => user.id == req.params.id);
    changedId.id = req.body.changeId;
    res.send('user was changed');
});

app.delete('/users/:id', (req, res) => {
    res.set('Content-Type', 'application/json');
    const delitedId = users.find(user => user.id == req.params.id);
    delitedId = " ";
    res.send('user was changed');
});

app.listen(8888, console.log('server started'));