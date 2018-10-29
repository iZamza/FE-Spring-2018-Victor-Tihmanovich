require('rootpath')();
const express = require('express');
const app = express();
const delay = require('express-delay');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(delay(1000));

app.use('/users', require('./users/users.controller'));

const port = 4000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
  });
