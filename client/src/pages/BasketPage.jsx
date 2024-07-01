import React, { useCallback, useContext, useEffect, useState } from "react";
import BasketService from "../services/BasketService";
import { Context } from "../main";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import ProductService from "../services/ProductService";
import { cutLastChar } from "../utils/helpers";
import * as Icon from "react-bootstrap-icons";

function BasketPage() {
  const { user, userBasket, product } = useContext(Context);
  const [isClicked, setClicked] = useState(false);
  const getBasketInfo = () => {
    ProductService.getAllBrands().then((data) => product.setBrands(data));

    ProductService.getAllTypes().then((data) => product.setTypes(data));

    BasketService.getUserBasket(user.user.id).then((baskets) => {
      userBasket.setBasket(baskets);
      userBasket.setBasketProductNum(userBasket.basket.length);

      // get prods
      ProductService.getAllProducts().then((data) => {
        product.setProducts(data);
      });
    });
    setClicked(false);
  };

  useEffect(() => {
    getBasketInfo();
  }, [isClicked]);

  const getProducts = () => {
    let prods = [];
    userBasket.basket.map((basket) => {
      product.products.map((product) => {
        if (basket.productId === product.id) {
          prods.push({ id: basket.id, product: product });
        }
      });
    });

    console.log(prods);
    return prods;
  };

  const handleDelete = (basketId) => {
    BasketService.deleteProductFromBasket(basketId);
    userBasket.deleteBasketProduct(basketId);

    setClicked(true);
  };

  return (
    <Container>
      <div>
        {getProducts().length > 0 ? (
          getProducts().map((item) => (
            <Row key={item.id} className="d-flex align-items-start mt-5">
              <Col md={2}>
                <Image
                  fluid
                  src={import.meta.env.VITE_BASE_URL + "/" + item.product.image}
                />
              </Col>
              <Col md={8}>
                <Card>
                  <Card.Header>
                    <Card.Title>
                      {cutLastChar(
                        product.getTypeById(item.product.typeId).name
                      )}{" "}
                      {product.getBrandById(item.product.brandId).name}{" "}
                      {item.product.name}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Price: {item.product.price}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      <Icon.Trash />
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          ))
        ) : (
          <Row
            style={{
              width: window.innerWidth - 100,
              height: window.innerHeight - 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "grey",
            }}
          >
            <h1 className="text-center">
              There is no products in the basket yet!
            </h1>
          </Row>
        )}
      </div>
    </Container>
  );
}

export default observer(BasketPage);
