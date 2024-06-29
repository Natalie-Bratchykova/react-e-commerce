import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Button, Col, Image, Row } from "react-bootstrap";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { PRODUCT_PAGE_ROUTE } from "../utils/const";
import { cutLastChar } from "../utils/helpers";

function ProductItem({ productInfo }) {
  const { product } = useContext(Context);
  const navigateTo = useNavigate();
  return (
    <Col>
      <Card style={{ width: "18rem" }}>
        <Row
          style={{
            minWidth: "15rem",
            maxWidth: "15rem",
            minHeight: "18rem",
            maxHeight: "18rem",
          }}
          className="d-flex align-items-center justify-content-center"
        >
          <Image
            height={"fit-content"}
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
        </Card.Body>
      </Card>
    </Col>
  );
}

export default observer(ProductItem);
