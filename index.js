const express = require('express');
const mongoose = require('mongoose');

const User = require('./model/user');

require('dotenv/config');

const app = express();

app.use(express.json());

// const customMiddleware = (req, res, next) => {
//   console.log('welcome to middleware');
//   next();
// };

// app.use(customMiddleware);

app.get('/', (req, res) => {
  res.send('This is your home');
});

app.get('/users', (req, res) => {
  let users = ['Any other name', 'Subliminal', 'Evening or Morning', 'Poost'];
  res.send({
    users: users,
  });
});

app.post('/create_user', async (req, res) => {
  try {
    const myuser = new User(req.body);
    await myuser.save();
    res.send(myuser);
  } catch (err) {
    res.send({ message: err });
  }
});

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (req, res) => {
    console.log('Connected to your DATABASE');
  }
);

app.listen(44302, () => {
  console.log('listening on port 44302');
});
