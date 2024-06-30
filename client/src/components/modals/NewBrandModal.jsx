import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ProductService from "../../services/ProductService";
import { Context } from "../../main";

function NewBrandModal({ show, hide }) {
  const { product } = useContext(Context);
  const [brandName, setBrandName] = useState("");
  const createBrand = (brandName) => {
    ProductService.createBrand(brandName).then((data) => {
      product.setAddedSuccessfully(Boolean(data));
      product.setModalMessage(
        `Brand ${brandName} was ${
          product.addedSuccessfully && "not"
        } added successfully`
      );
      console.log("process adding");
      console.log(product.addedSuccessfully);
      console.log(product.modalMessage);
      console.log(data);

      setBrandName("");
    });

    hide();
  };
  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Add new Brand </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Brand name</Form.Label>
            <Form.Control
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>
          Close
        </Button>
        <Button
          disabled={brandName.length === 0}
          variant="success"
          onClick={() => {
            createBrand(brandName);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default observer(NewBrandModal);
