import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = (props) => {
  const { show, onHide } = props;
  return (
    <Modal show={show} onHide={onHide} centered>
      {props.children}
    </Modal>
  );
};

export default CustomModal;
