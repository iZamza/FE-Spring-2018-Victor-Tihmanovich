import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

interface User {
  id: number;
  username: string;
  password: string;
  dateOfBirth: string;
  dateOfFirstLogin: string;
  dateOfNextNotification: string;
  information: string;
}

const app: express.Application = express();
const port = 4000;
const delay = require('express-delay');

app.use(function(__, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use(delay(1000));
app.use(bodyParser.json());
app.use((_, response, next) => {
  response.header('Content-Type', 'application/json');
  next();
});

let users: User[] = require('../users.json');

const findUser = (request: Request) => {
  return users.find((user: User) => user.id === request.params.id);
};

const userNotFoundError = (response: Response) => {
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
  } else {
    response.send(user);
  }
});

app.post('/users/add', (request, response) => {
  const newUser = request.body;
  users.push(newUser);

  response.send(newUser);
});

app.post('/users/login', (request, response) => {
  const user = users.find((u: User) => u.username === request.body.username && u.password === request.body.password);

  if (user) {
    console.log(user);

    response.send(user);
  } else {
    response.statusCode = 401;

    response.send('Not authorized!');
  }
});

app.post('/users/edit', (request, response) => {
  users = users.filter((u: User) => u.id !== request.body.id);
  const editedUser = request.body.object;
  users.push(editedUser);
    response.send(editedUser);
  }
);

app.post('/users/delete', (request, response) => {
    users = users.filter((u: User) => u.id !== request.body.id);
    response.send(users);
  }
);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
