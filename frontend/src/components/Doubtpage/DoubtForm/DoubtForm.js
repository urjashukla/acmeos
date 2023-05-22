import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const DoubtForm = () => {
  const [title, setTitle] = useState('');
  const [doubt, setDoubt] = useState('');
  const [tagstring, setTagstring] = useState('');

  const date = new Date();
  const dateInput = date.toDateString().substr(4);
  const uname = JSON.parse(localStorage.getItem('user'));

  const dbtfrmtitle = {
    padding: '20px',
    fontSize: '2rem',
  };
  const dbtfrm = {
    border: '2px solid #ececec',
    padding: '20px',
    borderRadius: '6px',
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:9000/doubt/ask', {
        title: title,
        doubt: doubt,
        tags: tagstring,
        date: dateInput,
        uname: uname.username,
      })
      .then((res) => {
        alert('Doubt Submitted Successfully');
        clearInput();
      });
    clearInput();
  };

  const clearInput = () => {
    setTitle('');
    setDoubt('');
    setTagstring('');
  };

  return (
    <>
      <Container className="p-5">
        <div className="doubtformtitle" style={dbtfrmtitle}>
          Ask your doubt
        </div>
        <Form
          className="doubtform"
          style={dbtfrm}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Form.Text muted>Your title must be short and crisp.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Doubt</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="doubtcontent"
              value={doubt}
              placeholder="Please describe your doubt"
              onChange={(e) => setDoubt(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.select">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              name="tags"
              value={tagstring}
              placeholder="Enter relevant tags"
              onChange={(e) => setTagstring(e.target.value)}
              required
            ></Form.Control>
            <Form.Text muted>
              Give comma separated values. You can give max 6 tags. For e.g. HTML, CSS, Javascript
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default DoubtForm;
