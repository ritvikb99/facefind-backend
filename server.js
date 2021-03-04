const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signIn = require('./controllers/signIn.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'tanumanu',
    database: 'facefind',
  },
});

const app = express();
app.use(cors());
app.use(express.json());

/* app.get('/', (req, res) => {
  res.json(database.users);
}); */

app.post('/signin', (req, res) => {
  signIn.handleSignIn(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.listen(3000, () => {
  console.log('Started listening on port 3000');
});

/* API PLAN

/ --> res= this is working 
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT --> user

*/