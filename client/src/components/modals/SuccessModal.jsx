import React, { useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../../main";
function SuccessModal({ show, hide, message }) {
  const { product } = useContext(Context);
  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>{message} </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessModal;
