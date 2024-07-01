import React, { useContext, useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ProductService from "../services/ProductService";
import { cutLastChar } from "../utils/helpers";
import BasketService from "../services/BasketService";
import { Trash } from "react-bootstrap-icons";
import { SHOP_ROUTE } from "../utils/const";
function ProductPage(props) {
  const { product, user, userBasket } = useContext(Context);
  const location = useLocation();
  const [info, setInfo] = useState([]);
  const navigateTo = useNavigate();

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

      ProductService.getProductInfo(id).then((data) => {
        setInfo(data);
      });
    });

    console.log("product info");
    console.log(product.product);
  }, [location]);

  const handleAddToBasket = (userId, productId) => {
    BasketService.addToBasket(userId, productId).then(() => {
      BasketService.getUserBasket(user.user.id).then((data) => {
        console.log(data);
        userBasket.setBasketProductNum(data.length);
      });
    });
  };

  const handleDelete = (productId) => {
    ProductService.deleteProduct(productId);
    navigateTo(SHOP_ROUTE);
  };
  return (
    <Container
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
                {info.map((inf) => (
                  <Card.Text key={inf.id}>
                    {inf.title}: {inf.description}
                  </Card.Text>
                ))}

                {user.isAuth && user.user.roles.includes("user") && (
                  <Row>
                    <Col>
                      <Button variant="outline-primary">
                        Add to wish list
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => {
                          handleAddToBasket(user.user.id, product.product.id);
                        }}
                      >
                        Add to basket
                      </Button>
                    </Col>
                  </Row>
                )}
                {user.isAuth && user.user.roles.includes("admin") && (
                  <Row>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product.product.id)}
                    >
                      <Trash />
                    </Button>
                  </Row>
                )}
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(ProductPage);
