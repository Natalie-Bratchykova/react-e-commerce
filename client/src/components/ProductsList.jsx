import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import ProductService from "../services/ProductService";
import { Row, Col, Button } from "react-bootstrap";
import ProductItem from "./ProductItem";
import { observer } from "mobx-react-lite";
import { ChevronDoubleLeft, ChevronDoubleRight } from "react-bootstrap-icons";
import { PAGE_LIMIT } from "../utils/const";
import BasketService from "../services/BasketService";
function ProductsList() {
  const { product, user, userBasket } = useContext(Context);
  const [currentPage, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (user.isAuth && user.user) {
      BasketService.getUserBasket(user.user.id).then((data) => {
        userBasket.setBasket(data);
      });
    }

    ProductService.getAllProductsAndPages(currentPage).then((data) => {
      product.setProducts(data.products);
      product.setIsPagination(data.pages > PAGE_LIMIT);
      console.log(`Can we display pages? ${product.isPagination}`);
      if (currentPage === Math.ceil(data.pages / PAGE_LIMIT)) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    });
  }, [currentPage]);

  const handleIncreasePages = () => {
    setPage(currentPage + 1);
  };

  const handleDecreasePage = () => {
    setPage(currentPage - 1);
  };
  return (
    <Row className="my-2 d-flex">
      {product.products.map((product) => (
        <ProductItem key={product.id} productInfo={product} />
      ))}
      <Row
        className={`d-flex justify-content-center mt-1 align-items-center ${
          !product.isPagination && "d-none"
        }`}
      >
        <Col
          onClick={handleDecreasePage}
          md={1}
          style={{
            cursor: "pointer",
          }}
        >
          {" "}
          {currentPage > 1 && <ChevronDoubleLeft />}
        </Col>
        <Col md={1}>
          <Button variant="outline-dark">{currentPage}</Button>
        </Col>
        <Col
          md={1}
          style={{
            cursor: "pointer",
          }}
          onClick={handleIncreasePages}
        >
          {!isLastPage && <ChevronDoubleRight />}
        </Col>
      </Row>
    </Row>
  );
}

export default observer(ProductsList);
