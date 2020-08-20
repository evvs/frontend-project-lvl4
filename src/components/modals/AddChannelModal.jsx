import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { close } from '../../slices/modal';

const AddChannelModal = (props) => {
  return (
    <>
    <Modal.Header closeButton>
      <Modal.Title>Modal title</Modal.Title>
    </Modal.Header>
  <Modal.Body>
    I will not close if you click outside me. Don't even try to press
    escape key.
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary">
      Close
    </Button>
    <Button variant="primary">Understood</Button>
  </Modal.Footer>
      </>
  )
}

export default AddChannelModal;