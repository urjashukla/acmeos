const express = require('express');
const router = express.Router();
const db = require('./../connection');

// Add bookmark to db
router.post('/', (req, res) => {
  let data = {
    uname: req.body.username,
    chapid: req.body.chapid,
  };

  db.query(
    'INSERT INTO bookmarks (username, chapterid) VALUES (?,?)',
    [data.uname, data.chapid],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err || 'Something went wrong' });
      } else {
        res.status(201).send({ status: 'Chapter bookmarked successfully' });
      }
    }
  );
});

// Get user bookmarked chapters
router.get('/', (req, res) => {
  let data = {
    uname: req.query.username,
  };

  db.query(
    'SELECT bookmarksid AS id, bookmarks.chapterid, title, username FROM bookmarks LEFT JOIN chapters ON bookmarks.chapterid = chapters.chapterid WHERE bookmarks.username=?',
    [data.uname],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err || 'Something went wrong' });
      } else {
        res.status(200).send({ result });
      }
    }
  );
});

// Get specific bookmarkid
router.get('/getid', (req, res) => {
  let data = {
    uname: req.query.username,
    chapid: req.query.chapid,
  };
  db.query(
    'SELECT * FROM bookmarks WHERE username=? AND chapterid=?',
    [data.uname, data.chapid],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err || 'Something went wrong' });
      } else {
        res.status(200).send({ result });
      }
    }
  );
});

// Delete bookmark
router.delete('/:id', (req, res) => {
  let id = req.params.id;

  db.query('DELETE FROM bookmarks WHERE bookmarksid=?', [id], (err, result) => {
    if (err) {
      res.status(500).send({ error: err || 'Something went wrong' });
    } else {
      res.status(200).send({ status: 'Bookmark removed' });
    }
  });
});

module.exports = router;
