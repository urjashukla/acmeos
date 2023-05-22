const express = require('express'),
  app = express(),
  cors = require('cors'),
  bcrypt = require('bcrypt'),
  // bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  db = require('./connection'),
  PORT = process.env.PORT || 9000;

const saltRounds = 10;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: process.env.KEY,
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const cpass = req.body.cpass;
  const pass = req.body.pass;

  if (username === '') {
    res.send({ message: 'Username required' });
  } else if (email === '') {
    res.send({ message: 'Valid email required' });
  } else if (cpass === '' || pass === '') {
    res.send({ message: "Password field can't be empty" });
  } else if (cpass === pass) {
    bcrypt.hash(pass, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          'INSERT INTO users (username, email, pass) VALUES (?,?,?)',
          [username, email, hash],
          (err, result) => {
            if (err) {
              res.send({ message: 'Same username exists' });
            } else {
              res.send({ message: 'Account created successfully' });
            }
          }
        );
      }
    });
  } else {
    res.send({ message: "Passwords doesn't match correct it" });
  }
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const pass = req.body.pass;

  db.query('SELECT * FROM users WHERE username = ?', username, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(pass, result[0].pass, (err, response) => {
        if (response) {
          req.session.user = result[0].username;
          res
            .status(200)
            .send({ msg: 'successfully logged in', userdata: { username: req.session.user } });
        } else {
          res.status(401).send({ msg: 'Invalid username or password' });
        }
      });
    } else {
      res.status(401).send({ msg: 'Invalid username or password' });
    }
  });
});

require('./routes')(app);

// catch 404
app.use((req, res, next) => {
  console.log(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  console.log(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
  res.status(status).send({ status, error: msg });
});

module.exports = app;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
