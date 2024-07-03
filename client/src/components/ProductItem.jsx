import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Button, Col, Image, Row } from "react-bootstrap";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { PRODUCT_PAGE_ROUTE } from "../utils/const";
import { cutLastChar } from "../utils/helpers";
import AddToBasketButton from "./AddToBasketButton";

function ProductItem({ productInfo }) {
  const { product, user } = useContext(Context);
  const navigateTo = useNavigate();

  return (
    <Col className="mt-2 mb-1">
      <Card style={{ width: "18rem", height: "18rem" }}>
        <Row className="d-flex align-items-center justify-content-center p-1">
          <Image
            style={{
              minHeight: "7rem",
              maxHeight: "7rem",
              width: "fit-content",
            }}
            width={"fit-content"}
            src={`${import.meta.env.VITE_BASE_URL}/${productInfo.image}`}
          />
        </Row>

        <Card.Body>
          <Card.Title>
            {cutLastChar(product.getTypeById(productInfo.typeId).name)}{" "}
            {product.getBrandById(productInfo.brandId).name}{" "}
            {productInfo.name.length > 20
              ? productInfo.name.substring(0, 15) + "..."
              : productInfo.name}
          </Card.Title>
          <Card.Text>{productInfo.price} hrn</Card.Text>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              navigateTo(PRODUCT_PAGE_ROUTE + "/" + productInfo.id);
            }}
          >
            See more
          </Button>
          {user.isAuth && user.user.roles.includes("user") && (
            <AddToBasketButton productInfo={productInfo} />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default observer(ProductItem);
