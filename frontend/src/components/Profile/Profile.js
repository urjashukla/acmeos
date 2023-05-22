import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import CheckedList from './CheckedList';
import SimpleList from './SimpleList';
import CustomModal from '../CustomModal/CustomModal';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import profilePic from './../../images/profilepic.jpg';
import './Profile.css';

const Profile = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const uname = JSON.parse(localStorage.getItem('user'));
  const reqUserParam = { params: { username: uname.username } };
  const [profileData, setProfileData] = useState({
    notes: null,
    doubts: null,
    bookmarks: [],
    inprogress: [],
  });

  const handleClose = () => {
    setShow(false);
  };

  const openModal = () => {
    setShow(true);
  };

  const addNote = (event) => {
    event.preventDefault();

    let options = {
      username: uname.username,
      title: event.target[0].value,
      description: event.target[1].value,
    };

    axios.post('http://localhost:9000/note', options).then((response) => {
      console.log('>>', response);
    });

    handleClose();
    setTimeout(reload, 2000);
  };

  const fetchProfileData = async () => {
    setLoading(true);
    const [notes, doubts, bookmarks, inprogress] = await Promise.all([
      axios.get('http://localhost:9000/note', reqUserParam).catch((error) => {
        console.log('Axios note Error');
        console.log(error);
      }),
      axios.get('http://localhost:9000/doubt', reqUserParam).catch((error) => {
        console.log('Axios doubt Error');
        console.log(error);
      }),
      axios.get('http://localhost:9000/bookmark', reqUserParam).catch((error) => {
        console.log('Axios bookmark Error');
        console.log(error);
      }),
      axios.get('http://localhost:9000/inprogress', reqUserParam).catch((error) => {
        console.log('Axios inprogress Error');
        console.log(error);
      }),
    ]);
    setLoading(false);
    setProfileData({
      notes: notes.data.result,
      doubts: doubts.data.result,
      bookmarks: bookmarks.data.result,
      inprogress: inprogress.data.result,
    });
  };

  const reload = () => {
    window.location.reload();
  };
  useEffect(() => {
    if (loading) {
      return <p>Data is loading...</p>;
    }
    fetchProfileData();
  }, []);

  return (
    <Container className="p-5" fluid>
      <Card>
        <Card.Body>
          <Row>
            <Col xs={12} sm={2}>
              <div className="avatar text-center">
                  <img
                    className="avatar__2sMj img-fluid img-thumbnail rounded"
                    src={profilePic}
                    alt="your avatar"
                  />
              </div>
            </Col>
            <Col xs={12} sm={10}>
              <div className="info_wrapper">
                <div className="info">
                  <div className="info_name">
                    <span className="">{uname.username}&nbsp;</span>
                    <span>
                      <a className="" href="/profileEdit">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </a>
                    </span>
                  </div>
                  <div className="info_tags">
                    <Badge bg="#32c749" className="categoryBadge ml-2">
                      Creative
                    </Badge>
                    <Badge bg="#32c749" className="categoryBadge ml-2">
                      Enthusiastic
                    </Badge>
                    <Badge bg="#32c749" className="categoryBadge ml-2">
                      Curious
                    </Badge>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Profile Tabs */}

      <Container className="mt-4 profileTabs">
        <Tabs
          defaultActiveKey="inprogress"
          id="controlled-tab-example"
          className="mb-3"
          style={{ width: 'max-content' }}
        >
          <Tab eventKey="inprogress" title="In progress">
            <h3>Continue Learning</h3>
            {profileData.inprogress.length === 0 ? (
              <h6>Nothing in progress</h6>
            ) : (
              <CheckedList list={profileData.inprogress} feature="inprogress" />
            )}
          </Tab>
          <Tab eventKey="doubts" title="Doubts">
            <h3>Your Doubts</h3>
            {profileData.doubts ? (
              <SimpleList list={profileData.doubts} />
            ) : (
              <h6>You have not asked any doubts yet</h6>
            )}
          </Tab>
          <Tab eventKey="bookmarks" title="Bookmarks">
            <h3>Bookmarked Chapters</h3>
            {profileData.bookmarks.length === 0 ? (
              <h6>No Bookmarks</h6>
            ) : (
              <CheckedList list={profileData.bookmarks} feature="bookmark" />
            )}
          </Tab>
          <Tab eventKey="notes" title="Notes">
            <h3>Important Notes</h3>
            <Button className="mb-3" onClick={openModal}>
              Add Note +
            </Button>
            <CustomModal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Note</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <>
                  <Form onSubmit={addNote}>
                    <Form.Group className="mb-3">
                      <FloatingLabel label="Title">
                        <Form.Control type="text" placeholder="Note Title" required />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <FloatingLabel label="Description">
                        <Form.Control type="text" placeholder="Description" required />
                      </FloatingLabel>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Save
                    </Button>
                  </Form>
                </>
              </Modal.Body>
            </CustomModal>
            {profileData.notes ? (
              <CustomAccordion list={profileData.notes} />
            ) : (
              <h6>No notes taken</h6>
            )}
          </Tab>
        </Tabs>
      </Container>
    </Container>
  );
};

export default Profile;
