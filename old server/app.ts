require('rootpath')();
import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
const delay = require('express-delay');
const cors = require('cors');

interface User {
  id: number;
  name: string;
  password: string;
  dateOfBirth: string;
  dateOfFirstLogin: string;
  dateOfNextNotification: string;
  information: string;
}

const app: express.Application = express();
const port = 8888;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(delay(1000));
app.use((_, response, next) => {
  response.header('Content-Type', 'application/json');
  next();
});
app.use('/users', require('./users/users.controller'));

let users: User[] = require('./users.json');

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
  console.log(newUser);
  users.push(newUser);

  response.send(newUser);
});

app.put('/users/:id', (request, response) => {
  const user = findUser(request);

  if (!user) {
    userNotFoundError(response);
  }  else {
    const userIndex = users.findIndex((user: User) => user.id === request.params.id);
    users[userIndex] = request.body;

    response.send(users[userIndex]);
  }
});

app.delete('/users/:id', (request, response) => {
  const user = findUser(request);

  if (!user) {
    userNotFoundError(response);
  }  else {
    users = users.filter((user: User) => user.id !== request.params.id);
    response.send(users);
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
