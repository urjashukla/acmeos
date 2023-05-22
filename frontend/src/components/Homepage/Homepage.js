import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import mainImg from './../../images/mainImg.png';
import joinusImg from './../../images/joinus.png';
import doubt from './../../images/doubt.svg';
import terminal from './../../images/terminal.svg';
import test from './../../images/test.svg';
import HomeButton from '../Button/HomeButton';
import HomeCarousel from '../HomeCarousel/HomeCarousel';
import './Homepage.css';

const Homepage = () => {
  const [cardDtls, setCardDtls] = useState([
    {
      img: doubt,
      title: 'Doubt',
      desp: 'Doubt filled your mind?? Got stucked?? No worries, just ask your doubts here and get them answered',
      link: '/doubt',
    },
    {
      img: terminal,
      title: 'Terminal',
      desp: 'Feeling bored with only concepts of OS? Wanna try some cool Linux commands? Hit the terminal',
      link: '/terminal',
    },
    {
      img: test,
      title: 'Test',
      desp: "Don't stress, Do your Best, Forget the Rest, And start your test.",
      link: '/test',
    },
  ]);
  return (
    <Container className="p-0 mt-2 oflw" fluid>
      <Container className="landing-page">
        <div className="content">
          <div className="text-cont">
            <h1 className="header">Learn in a fun way</h1>
            <p className="description">
              Our vision is to teach you the invisible part of your instruments.
            </p>
            <a href="/chapters">
              <HomeButton title="Learn More" />
            </a>
          </div>
          <div className="img-cont">
            <img className="img" alt="Working on Desk" src={mainImg} />
          </div>
        </div>
      </Container>
      <Row className="p-0 flex-md-row">
        <Col>
          <HomeCarousel />
        </Col>
      </Row>
      <Row as="div" className="servicesDiv">
        <div className="heading weprovide">We provide</div>
        <div className="servicescarddiv">
          <Row xs={1} md={2} lg={3} className="g-5 p-5">
            {cardDtls.map((idx, key) => (
              <Col key={key}>
                <a href={idx.link}>
                  <Card className="servicescard">
                    <div className="imgBox">
                      <Card.Img variant="top" src={idx.img} />
                    </div>
                    <Card.Body className="cardText">
                      <div className="cardTitle">{idx.title}</div>
                      <Card.Text>{idx.desp}</Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </Row>
      <Container className="landing-page">
        <div className="content">
          <div className="text-cont">
            <h1 className="header">Join Us</h1>
            <p className="description">Be a part of this incredible community.</p>
            <a href="/login">
              <HomeButton title="Join Us Now" />
            </a>
          </div>
          <div className="img-cont">
            <img className="img" alt="Cheering Girl" src={joinusImg} />
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Homepage;
