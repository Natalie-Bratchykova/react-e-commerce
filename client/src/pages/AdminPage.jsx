import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NewTypeModal from "../components/modals/NewTypeModal";
import NewBrandModal from "../components/modals/NewBrandModal";
import { Context } from "../main";
import SuccessModal from "../components/modals/SuccessModal";
import NewProductModal from "../components/modals/NewProductModal";

function AdminPage() {
  const { product, user } = useContext(Context);
  const [showNewTypeModal, setShowNewTypeModal] = useState(false);
  const hideTypeModal = () => setShowNewTypeModal(false);

  const [showNewBrandModal, setShowNewBrandModal] = useState(false);
  const hideBrandModal = () => setShowNewBrandModal(false);

  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const hideProductModal = () => setShowNewProductModal(false);

  const hideSuccessModal = () => {
    product.setAddedSuccessfully(false);
  };

  return (
    <Container>
      <Row
        className="d-flex justify-content-center my-5"
        style={{
          fontSize: "2rem",
        }}
      >
        Hi, {user.user.email}!
      </Row>
      <Row>
        <Col className="d-flex justify-content-center gap-3">
          <Button className="mt-2" onClick={() => setShowNewTypeModal(true)}>
            Add new Type
          </Button>
          <Button className="mt-2" onClick={() => setShowNewBrandModal(true)}>
            Add new Brand
          </Button>
          <Button className="mt-2" onClick={() => setShowNewProductModal(true)}>
            Add new Product
          </Button>
        </Col>
      </Row>
      <NewTypeModal show={showNewTypeModal} hide={hideTypeModal} />
      <NewBrandModal show={showNewBrandModal} hide={hideBrandModal} />
      <NewProductModal show={showNewProductModal} hide={hideProductModal} />
      <SuccessModal
        show={product.addedSuccessfully}
        hide={hideSuccessModal}
        message={product.modalMessage}
      />
    </Container>
  );
}

export default observer(AdminPage);
