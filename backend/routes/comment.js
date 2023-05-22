const express = require('express');
const router = express.Router();
const db = require('./../connection');

// Add comment to db
router.post('/add', (req, res) => {
  let data = {
    id: req.body.doubtid,
    user: req.body.user,
    comment: req.body.comment,
    date: req.body.date,
  };
  db.query(
    'INSERT INTO commenttbl (doubtid, username, comment, date) VALUES (?,?,?,?)',
    [data.id, data.user, data.comment, data.date],
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err || 'Something went wrong.',
        });
      } else {
        res.status(201).send({ status: 'Comment added successfully' });
      }
    }
  );
});

// Fetch all comments by doubtid
router.get('/getallcomments/:doubtid', (req, res) => {
  let id = req.params.doubtid;
  // SELECT commenttbl.commentid, commenttbl.comment, commenttbl.votes, votes.votetype FROM commenttbl
  // LEFT JOIN votes ON commenttbl.commentid = votes.commentid AND votes.username="lr"
  // ORDER BY commenttbl.votes DESC;

  db.query('SELECT * FROM commenttbl WHERE doubtid=?', [id], (err, result) => {
    if (err) {
      res.status(500).send({
        error: err || 'Something went wrong.',
      });
    } else {
      res.status(200).send({ result });
    }
  });
});

// Fetch user specific voted comment
router.get('/userVoted', (req, res) => {
  let data = {
    uname: req.query.username,
    doubtid: req.query.doubtid,
  };
  db.query(
    'SELECT * FROM votes HAVING votes.commentid IN (SELECT c.commentid FROM commenttbl AS c WHERE c.doubtid=?) AND votes.username=?',
    [data.doubtid, data.uname],
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err || 'Something went wrong.',
        });
      } else {
        res.status(200).send({ result });
      }
    }
  );
});

// Update the vote count
router.patch('/voteCount', (req, res) => {
  let data = {
    commentid: req.body.commentid,
    vtype: req.body.votetype,
  };
  let query = '';
  if (data.vtype) {
    query = 'UPDATE commenttbl SET votes = votes + 1 WHERE commentid = ?';
  } else {
    query = 'UPDATE commenttbl SET votes = votes - 1 WHERE commentid = ?';
  }
  db.query(query, [data.commentid], (err, result) => {
    if (err) {
      res.status(500).send({
        error: err || 'Something went wrong.',
      });
    } else {
      res.status(200).send({ status: 'OK' });
    }
  });
});

module.exports = router;
