import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import ProductService from "../services/ProductService";
import { Row } from "react-bootstrap";
import ProductItem from "./ProductItem";
import { observer } from "mobx-react-lite";

function ProductsList(props) {
  const { product } = useContext(Context);
  useEffect(() => {
    ProductService.getAllProducts().then((data) => {
      product.setProducts(data);
      console.log(data);
    });
  }, []);
  return (
    <Row className="mt-2">
      {product.products.map((product) => (
        <ProductItem key={product.id} productInfo={product} />
      ))}
    </Row>
  );
}

export default observer(ProductsList);
