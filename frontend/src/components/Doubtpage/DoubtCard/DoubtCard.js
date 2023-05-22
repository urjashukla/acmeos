import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DoubtCard = ({ data }) => {
  const tags = data.tags.split(',');
  const url = '/comment?doubtnum=' + `${data.doubtid}`;
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col className="coltitle" xs={12} sm={9}>
              <a href={url}>{data.title}</a>
            </Col>
            <Col xs={12} sm={3}>
              <span className="coldate">Date: {data.date}</span>
            </Col>
          </Row>
        </Card.Title>
        <Card.Subtitle className="mb-2">
          {tags.map((tag, index) => {
            return (
              <Badge bg="#32c749" key={index} className="categoryBadge ml-2">
                {tag}
              </Badge>
            );
          })}
        </Card.Subtitle>
        <Card.Text>{data.doubt}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default React.memo(DoubtCard);
