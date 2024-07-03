import { observer } from "mobx-react-lite";
import React, { createContext, useContext, useState } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import NewTypeModal from "../components/modals/NewTypeModal";
import NewBrandModal from "../components/modals/NewBrandModal";
import { Context } from "../main";
import SuccessModal from "../components/modals/SuccessModal";
import NewProductModal from "../components/modals/NewProductModal";
export const AdminContext = createContext(null);
function AdminPage() {
  const { product, user } = useContext(Context);
  const [popularProductClicked, setPopularProductClicked] = useState(false);
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
      <Row>
        <Col
          md={3}
          style={{
            fontSize: "1.3rem",
          }}
        >
          <Accordion className="mt-5">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Add new items</Accordion.Header>
              <Accordion.Body className="d-flex flex-column justify-content-center p-2 gap-2">
                <Button
                  variant="outline-primary"
                  onClick={() => setShowNewTypeModal(true)}
                >
                  Add new type
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowNewBrandModal(true)}
                >
                  Add new brand
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowNewProductModal(true)}
                >
                  Add new product
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col md={9} className="d-flex justify-content-center my-5">
          <Row
            style={{
              width: "100%",
              fontSize: "2rem",
            }}
          >
            Hi, {user.user.email}!
            {popularProductClicked && <PopularProductStatistic />}
          </Row>
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
