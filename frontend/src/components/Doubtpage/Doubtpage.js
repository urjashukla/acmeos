import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DoubtCard from './DoubtCard/DoubtCard';
import './Doubtpage.css';

const Doubtpage = () => {
  const [doubtData, setDoubtData] = useState([]);
  useEffect(() => {
    const getDoubts = async () => {
      const response = await axios.get('http://localhost:9000/doubt/getdoubt');
      setDoubtData(response.data.result);
    };
    getDoubts();
  }, []);
  return (
    <Container className="p-5" fluid>
      <Card>
        <Card.Body>
          <Row>
            <Col xs={6} sm={6}>
              <span className="asktxt">Have a doubt??</span>
            </Col>
            <Col xs={6} sm={6}>
              <Button variant="primary" className="askbtn" href="/doubt/ask">
                Ask Here
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <hr />
      <Container>
        {doubtData.map((a, index) => {
          return <DoubtCard key={index} data={doubtData[index]} />;
        })}
      </Container>
    </Container>
  );
};

export default Doubtpage;
