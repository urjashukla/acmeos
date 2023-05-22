import Accordion from 'react-bootstrap/Accordion';

const CustomAccordion = ({ list }) => {
  return (
    <Accordion>
      {console.log('accordion data ?? ', list)}
      {list.map((data, key) => {
        return (
          <Accordion.Item key={data.noteid} eventKey={key}>
            <Accordion.Header>{data.title}</Accordion.Header>
            <Accordion.Body>{data.desp}</Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default CustomAccordion;
