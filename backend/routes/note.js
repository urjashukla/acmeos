const express = require('express');
const router = express.Router();
const db = require('./../connection');

// Add note to db
router.post('/', (req, res) => {
  let data = {
    user: req.body.username,
    title: req.body.title,
    desp: req.body.description,
  };
  db.query(
    'INSERT INTO notes (username, title, desp) VALUES (?,?,?)',
    [data.user, data.title, data.desp],
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err || 'Something went wrong.',
        });
      } else {
        res.status(201).send({ status: 'Note added successfully' });
      }
    }
  );
});

// Fetch user specific notes
router.get('/', (req, res) => {
  let data = {
    user: req.query.username,
  };
  db.query('SELECT * FROM notes WHERE username=?', [data.user], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({ result: result });
    }
  });
});

module.exports = router;
