const express = require('express');
const router = express.Router();
const db = require('./../connection');

// Add vote entry to db
router.post('/addvote', (req, res) => {
  let data = {
    user: req.body.username,
    commentid: req.body.commentid,
    vtype: req.body.votetype,
  };
  db.query(
    'INSERT INTO votes (username,commentid,votetype) VALUES (?,?,?)',
    [data.user, data.commentid, data.vtype],
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err || 'Something went wrong.',
        });
      } else {
        res.status(201).send({ status: 'Thanks for voting!!' });
      }
    }
  );
});

// Change votetype
router.patch('/votetype', (req, res) => {
  let data = {
    user: req.body.username,
    commentid: req.body.commentid,
    vtype: req.body.votetype,
  };
  db.query(
    'UPDATE votes SET votetype=? WHERE username=? AND commentid=?',
    [data.vtype, data.user, data.commentid],
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err || 'Something went wrong.',
        });
      } else {
        res.status(200).send({ status: 'votetype updated' });
      }
    }
  );
});

// Delete vote
router.delete('/voteentry', (req, res) => {
  let data = {
    user: req.body.username,
    commentid: req.body.commentid,
  };
  db.query(
    'DELETE FROM votes WHERE username=? AND commentid=?',
    [data.user, data.commentid],
    (err, result) => {
      if (err) {
        res.status(500).send({
          error: err || 'Something went wrong.',
        });
      } else {
        res.status(200).send({ status: 'deleted from votes' });
      }
    }
  );
});

module.exports = router;
