import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Comments from './Comments';

const Commentpage = () => {
  const [doubt, setDoubt] = useState({});
  const [commentBox, setCommentBox] = useState('');
  const [comments, setComments] = useState([]);
  const [voted, setVoted] = useState([]);
  const search = useLocation().search;
  const doubtid = new URLSearchParams(search).get('doubtnum');
  const date = new Date().toDateString().substr(4);
  const uname = JSON.parse(localStorage.getItem('user'));

  const getDoubts = () => {
    axios.get('http://localhost:9000/doubt/getdoubt/' + `${doubtid}`).then((res) => {
      setDoubt(res.data.result);
    });
  };

  const getComments = () => {
    axios
      .get('http://localhost:9000/comment/getallcomments/' + `${doubtid}`)
      .then((res) => {
        setComments(res.data.result);
      })
      .catch((error) => {
        console.log('Axios get doubt specific comment Error');
        console.log(error);
      });
  };

  const getUserVotedComments = () => {
    if (uname === null) {
      return;
    }
    // The request is sent only if user logged in
    axios
      .get('http://localhost:9000/comment/userVoted', {
        params: {
          username: uname.username,
          doubtid: doubtid,
        },
      })
      .then((res) => {
        setVoted(res.data.result);
      })
      .catch((error) => {
        console.log('Axios vote Error');
        console.log(error);
      });
  };

  useEffect(() => {
    getDoubts();
    getUserVotedComments();
    getComments();
  }, []);

  const handleSubmit = () => {
    if (uname === null) {
      return alert('You must log in to be able to comment');
    }
    let options = {
      doubtid: doubtid,
      user: uname.username,
      comment: commentBox,
      date: date,
    };
    axios
      .post('http://localhost:9000/comment/add', options)
      .then((res) => {
        alert('comment added successfully');
        clearInput();
      })
      .catch((error) => {
        console.log('Axios Error');
        console.log(error);
      });
  };

  const clearInput = () => {
    setCommentBox('');
  };

  return (
    <Container className="p-5" fluid>
      <Card>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col className="coltitle" xs={12} sm={9}>
                {doubt.title}
              </Col>
              <Col xs={12} sm={3}>
                <span className="coldate">Date: {doubt.date}</span>
              </Col>
            </Row>
          </Card.Title>
          <Card.Text>{doubt.doubt}</Card.Text>
        </Card.Body>
      </Card>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Card.Body className="p-2" style={{ marginTop: '12px' }}>
          <Row>
            <Col xs={12} sm={10}>
              <Form.Control
                type="text"
                name="title"
                value={commentBox}
                placeholder="Enter your answer"
                onChange={(e) => setCommentBox(e.target.value)}
                required
              />
            </Col>
            <Col xs={12} sm={1}></Col>
            <Col xs={12} sm={1}>
              <Button variant="primary" type="submit" className="askbtn">
                Comment
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Form>
      <hr />
      {comments.length === 0 ? (
        <div>No comments posted yet</div>
      ) : (
        comments.map((index) => {
          let voteType = null;
          voted.forEach((element) => {
            if (index.commentid === element.commentid) {
              voteType = element.votetype;
            }
          });
          return <Comments key={index.commentid} comments={index} vtype={voteType} />;
        })
      )}
    </Container>
  );
};

export default Commentpage;
