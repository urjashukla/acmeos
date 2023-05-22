import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './Profile.css';

const ProfileEditForm = () => {
  const [profileData, setProfileData] = useState({ username: '', email: '', tags: '' });
  const uname = JSON.parse(localStorage.getItem('user'));
  const reqUserParam = { params: { username: uname.username } };
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [toastbg, setToastbg] = useState('');
  const [toasttitle, setToasttilte] = useState('');

  const editfrmtitle = {
    padding: '20px',
    fontSize: '2rem',
  };
  const editfrm = {
    border: '2px solid #ececec',
    padding: '20px',
    borderRadius: '6px',
  };

  const fetchProfileInfo = () => {
    axios.get('http://localhost:9000/profile/', reqUserParam).then((res) => {
      setProfileData(res.data.result[0]);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = profileData;
    axios
      .put('http://localhost:9000/profile/', data)
      .then((res) => {
        setShow(true);
        setToasttilte('Success');
        setToastbg('success');
        setMessage(res.data.message);
      })
      .catch((err) => console.log('Put error', err));
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  return (
    <>
      <Container className="p-5">
        <div className="editformtitle" style={editfrmtitle}>
          Update your profile
        </div>
        <Form className="editprofile" onSubmit={handleSubmit} style={editfrm}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={profileData.email}
              placeholder="Enter email address"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.select">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              name="tags"
              value={profileData.tags}
              placeholder="Enter relevant tags"
              onChange={handleChange}
              required
            ></Form.Control>
            <Form.Text muted>
              Give comma separated values. You can give max 6 tags, anything which describes you
              best. For e.g. Enthusiastic, Designer, Developer
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
        <ToastContainer className="p-3" position="top-end">
          <Toast show={show} bg={toastbg} onClose={() => setShow(false)}>
            <Toast.Header>
              <strong className="me-auto">{toasttitle}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </>
  );
};

export default ProfileEditForm;
