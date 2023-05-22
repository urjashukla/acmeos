const express = require('express');
const router = express.Router();
const db = require('./../connection');

// Add chapter to inprogress db
router.post('/', (req, res) => {
  let data = {
    user: req.body.username,
    chapid: req.body.chapid,
  };
  db.query(
    'INSERT INTO inprogress (username, chapid) VALUES (?,?)',
    [data.user, data.chapid],
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err || 'Something went wrong.',
        });
      } else {
        res.status(201).send({ status: 'Chapter in progress' });
      }
    }
  );
});

// Fetch user specific inprogress chapter
router.get('/', (req, res) => {
  let data = {
    user: req.query.username,
  };
  db.query(
    'SELECT inprogressid AS id, username, title, chapterid FROM inprogress LEFT JOIN chapters ON inprogress.chapid = chapters.chapterid WHERE inprogress.username=? AND status="inprogress"',
    [data.user],
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err || 'Something went wrong.',
        });
      } else {
        res.status(200).send({ result: result });
      }
    }
  );
});

// Update status
router.patch('/', (req, res) => {
  let data = {
    user: req.body.username,
    chapterid: req.body.chapid,
  };
  db.query(
    'UPDATE inprogress SET status="done" WHERE username=? AND chapid=?',
    [data.user, data.chapterid],
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err || 'Something went wrong.',
        });
      } else {
        res.status(201).send({ status: 'Status updated successfully' });
      }
    }
  );
});

// Fetch completed chapters
router.get('/completed', (req, res) => {
  let data = {
    user: req.query.username,
  };
  db.query(
    'SELECT chapid FROM inprogress WHERE username=? AND status="done"',
    [data.user],
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err || 'Something went wrong.',
        });
      } else {
        res.status(200).send({ result: result });
      }
    }
  );
});

// Remove inprogress
router.delete('/:id', (req, res) => {
  let id = req.params.id;

  db.query('DELETE FROM inprogress WHERE inprogressid=?', [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: err || 'Something went wrong' });
    } else {
      res.status(200).send({ status: 'Chapter removed from in progress list' });
    }
  });
});

module.exports = router;
