import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ProductService from "../../services/ProductService";
import { Context } from "../../main";
function NewTypeModal({ show, hide }) {
  const { product } = useContext(Context);
  const createType = (typeName) => {
    console.log("before sending request = " + typeName);
    ProductService.createType(typeName).then((data) => {
      product.setAddedSuccessfully(Boolean(data));
      product.setModalMessage(
        `Brand ${typeName} was ${
          product.addedSuccessfully && "not"
        } added successfully`
      );
      console.log("process adding");
      console.log(product.addedSuccessfully);
      console.log(product);
      console.log(data);
      hide();
    });
  };
  const [typeName, setTypeName] = useState("");
  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Add new Type </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Type name</Form.Label>
            <Form.Control
              type="text"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>
          Close
        </Button>
        <Button
          disabled={typeName.length === 0}
          variant="success"
          onClick={() => {
            createType(typeName);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default observer(NewTypeModal);
