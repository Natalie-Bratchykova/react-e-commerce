import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row, Button, Image } from "react-bootstrap";
import { Context } from "../main";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ProductService from "../services/ProductService";
import { cutLastChar } from "../utils/helpers";
import BasketService from "../services/BasketService";
import { Basket, Star, Trash } from "react-bootstrap-icons";
import { BASKET_ROUTE, SHOP_ROUTE } from "../utils/const";

function ProductPage() {
  const { product, user, userBasket } = useContext(Context);
  const location = useLocation();
  const [info, setInfo] = useState([]);
  const [inBasket, setInBasket] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const navigateTo = useNavigate();

  useEffect(() => {
    const id = location.pathname.split("/").at(-1);
    if (user.user) {
      BasketService.getUserBasket(user.user.id).then((data) => {
        userBasket.setBasket(data);
      });
    }

    ProductService.getProductById(id).then((data) => {
      product.setProduct({ ...data, isInBasket: false });
      setCurrentProduct(data);
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
  }, [location]);

  const checkProductInBasket = () => {
    userBasket.basket.map((basket) => {
      if (basket.productId === product.product.id) {
        product.product.isInBasket = true;
      }
    });

    return product.product;
  };

  const handleAddToBasket = (userId, productId) => {
    BasketService.addToBasket(userId, productId).then(() => {
      BasketService.getUserBasket(user.user.id).then((data) => {
        console.log(data);
        setInBasket(data);
        userBasket.setBasketProductNum(data.length);
      });
    });
    product.product.isInBasket = true;
    console.log("in basket");
    console.log(inBasket);
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
            <Card.Body className="d-flex justify-content-between">
              <Card.Title>Price:{product.product.price} hrn</Card.Title>
              <Card.Title className="d-flex align-items-center">
                {product.product.rating + " "} <Star />
              </Card.Title>
            </Card.Body>
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
                    <Button variant="outline-success">Add to wish list</Button>
                  </Col>
                  <Col>
                    {checkProductInBasket().isInBasket ? (
                      <Button
                        variant="outline-success"
                        onClick={() => {
                          navigateTo(BASKET_ROUTE);
                        }}
                      >
                        In basket <Basket />
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => {
                          handleAddToBasket(user.user.id, product.product.id);
                        }}
                      >
                        Add to basket
                      </Button>
                    )}
                  </Col>
                </Row>
              )}
              {user.isAuth && user.user.roles.includes("admin") && (
                <Row className="d-flex justify-content-between">
                  <Col>
                    <Button
                      style={{
                        width: "100%",
                      }}
                      variant="danger"
                      onClick={() => handleDelete(product.product.id)}
                    >
                      <Trash />
                    </Button>
                  </Col>
                </Row>
              )}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    
    </Container>
  );
}

export default observer(ProductPage);
