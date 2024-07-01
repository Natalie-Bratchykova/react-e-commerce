import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import ProductService from "../services/ProductService";
import { Row, Col } from "react-bootstrap";
import ProductItem from "./ProductItem";
import { observer } from "mobx-react-lite";
import { ChevronDoubleLeft, ChevronDoubleRight } from "react-bootstrap-icons";

function ProductsList(props) {
  const { product } = useContext(Context);
  const [currentPage, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const PAGE_LIMIT = 3;
  useEffect(() => {
    ProductService.getAllProductsAndPages(currentPage, PAGE_LIMIT).then(
      (data) => {
        product.setProducts(data.products);

        if (currentPage === Math.ceil(data.pages / PAGE_LIMIT)) {
          setIsLastPage(true);
        }
        console.log(data);
      }
    );
  }, [currentPage]);

  const handleIncreasePages = () => {
    setPage(currentPage + 1);
  };

  const handleDecreasePage = () => {
    setPage(currentPage - 1);
  };
  return (
    <Row className="mt-2">
      {product.products.map((product) => (
        <ProductItem key={product.id} productInfo={product} />
      ))}
      <Row className="d-flex justify-content-center mt-5">
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
        <Col md={1}>{currentPage}</Col>
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
