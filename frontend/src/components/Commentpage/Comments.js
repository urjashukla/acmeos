import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Comments = ({ comments, vtype }) => {
  const [upvote, setUpvote] = useState('unset');
  const [downvote, setDownvote] = useState('unset');
  const uname = JSON.parse(localStorage.getItem('user'));

  const { commentid, comment, votes } = comments;

  useEffect(() => {
    if (vtype === null) {
      setUpvote('unset');
      setDownvote('unset');
    } else if (vtype === 1) {
      setUpvote('blue');
    } else {
      setDownvote('blue');
    }
  }, [vtype]);

  // Post req
  const postVoteReq = (payload) => {
    axios
      .post('http://localhost:9000/vote/addvote', payload)
      .then((res) => {
        console.log('vote posted response ', res);
      })
      .catch((error) => {
        if (error.res) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.res.data);
          console.log(error.res.status);
          console.log(error.res.headers);
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', error.message);
        }
        console.log(error);
      });
  };

  // Patch req
  const patchVoteCountReq = (payload) => {
    axios
      .patch('http://localhost:9000/comment/voteCount', payload)
      .then((res) => {
        console.log('vote count patched response ', res);
      })
      .catch((error) => {
        if (error.res) {
          console.log(error.res.data);
          console.log(error.res.status);
          console.log(error.res.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error);
      });
  };

  // Delete req
  const deleteVoteReq = (payload) => {
    axios
      .delete('http://localhost:9000/vote/voteentry', { data: payload })
      .then((res) => {
        console.log('vote entry deleted ', res);
      })
      .catch((error) => {
        if (error.res) {
          console.log(error.res.data);
          console.log(error.res.status);
          console.log(error.res.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error);
      });
  };

  const vote = (votetype) => {
    if (uname === null) {
      return alert('You must log in to be able to vote a comment and help the community');
    }
    let options = {
      username: uname.username,
      commentid: commentid,
      votetype: votetype,
    };

    if (vtype === null) {
      //No vote casted

      postVoteReq(options);
      patchVoteCountReq(options);

      alert('Thanks for voting!!');
      window.location.reload();
    } else if ((vtype === 1 && votetype === 0) || (vtype === 0 && votetype === 1)) {
      //Trying to downvote an already upvoted comment or vice versa

      alert('Please deselect your previous vote.');
    } else {
      //Remove vote

      deleteVoteReq(options);

      //Reverse the votetype

      options.votetype = !votetype;

      patchVoteCountReq(options);
      window.location.reload();
    }
  };

  return (
    <Card key={commentid}>
      <Card.Body>
        <Card.Text>{comment}</Card.Text>
        <Card.Subtitle>
          <i
            id="up"
            className="fa fa-thumbs-o-up"
            aria-hidden="true"
            style={{ marginRight: '12px', cursor: 'pointer', color: `${upvote}` }}
            onClick={(e) => vote(1)}
          ></i>
          {votes}
          <i
            id="down"
            className="fa fa-thumbs-o-down"
            aria-hidden="true"
            style={{
              marginLeft: '12px',
              cursor: 'pointer',
              color: `${downvote}`,
              transform: 'scaleX(-1)',
            }}
            onClick={(e) => vote(0)}
          ></i>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};
export default React.memo(Comments);
