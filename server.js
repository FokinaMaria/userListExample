const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// TODO users to data.js
let users = [
  {
    id: '123',
    firstName: 'Pavel',
    secondName: 'Efimov',
    email: 'test@gmail.com'
  }
];

const app = express();

app.use(bodyParser());

app.use(express.static(join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.get('/users', (req, res) => {
  res.send(users);
});

app.put('/user', (req, res) => {
  users.push(req.body);

  res.sendStatus(200);
});

app.delete('/user', (req, res) => {
  // TODO make something
  //console.log('asasdasdadDELIT', req.query);
  users = users.filter(elem => elem.firstName !== req.query.firstName);
  //console.log('asasdasdadDELIThhhhh', users);
  res.sendStatus(200);
});

app.post('/user', (req, res) => {
  //console.log('qwqwqwe', req.body);
  //users = users.filter(elem => elem.id === req.query.id);
  users = users.map(function(elem) {
    if (elem.id === req.body.id) {
      return (elem = req.body);
    } else {
      return elem;
    }
  });
  console.log('asasdasdadDELIThhhhh', users);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('port 3000'));
