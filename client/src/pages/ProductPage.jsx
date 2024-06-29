import React, { useContext, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Image,
  Accordion,
} from "react-bootstrap";
import { Context } from "../main";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ProductService from "../services/ProductService";
import { cutLastChar } from "../utils/helpers";
function ProductPage(props) {
  const { product } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.split("/").at(-1);
    ProductService.getProductById(id).then((data) => {
      product.setProduct(data);
      console.log(data);
      ProductService.getTypeById(data.typeId).then((typeData) => {
        product.setSelectedType(typeData);
      });
      ProductService.getBrandById(data.brandId).then((brandData) => {
        product.setSelectedBrand(brandData);
      });
    });

    console.log(product.product);
  }, [location]);

  return (
    <Container
      // className="d-flex align-items-center justify-content-center"
      style={{
        width: "100vh",
      }}
    >
      <Row className="mt-5 d-flex align-items-center">
        <Col md={4}>
          <Image
            fluid
            src={import.meta.env.VITE_BASE_URL + "/" + product.product.image}
          />
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>
              <Card.Title>
                {cutLastChar(product.selectedType.name) +
                  " " +
                  product.selectedBrand.name +
                  " " +
                  product.product.name}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Subtitle>Rating: {product.product.rating}</Card.Subtitle>
              <Card.Title>Price:{product.product.price} hrn</Card.Title>
              <Card.Footer className="mt-2">
                <Card.Title>Description</Card.Title>
                <Card.Text>Description will be here</Card.Text>
                <Row>
                  <Col>
                    <Button variant="outline-primary">Add to wish list</Button>
                  </Col>
                  <Col>
                    <Button>Add to basket</Button>
                  </Col>
                </Row>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(ProductPage);
