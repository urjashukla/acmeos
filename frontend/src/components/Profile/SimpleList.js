import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const SimpleList = ({ list }) => {
  return (
    <>
      <ListGroup>
        {list.map((data, key) => {
          const url = '/comment?doubtnum=' + `${data.doubtid}`;
          return (
            <ListGroup.Item key={key}>
              <a href={url} className="link-text">
                {data.doubt.length > 50 ? data.doubt.substring(0, 50) + '...' : data.doubt}
              </a>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

export default SimpleList;
