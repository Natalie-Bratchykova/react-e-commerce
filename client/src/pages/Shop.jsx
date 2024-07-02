import { Col, Container, Row, Button } from "react-bootstrap";
import TypesBar from "../components/TypesBar";
import BrandBar from "../components/BrandBar";
import ProductsList from "../components/ProductsList";
import { useContext, useEffect } from "react";
import { Context } from "../main";
import ProductService from "../services/ProductService";
import { observer } from "mobx-react-lite";
import { PAGE_LIMIT } from "../utils/const";

function Shop() {
  const { product } = useContext(Context);
  useEffect(() => {
    console.log("brand = " + product.selectedBrand.id);
    console.log("type = " + product.selectedType.id);
    ProductService.getAllProductsWithFilters(
      product.selectedType.id,
      product.selectedBrand.id
    ).then((data) => {
      product.setProducts(data.products);
      product.setIsPagination(data.count > PAGE_LIMIT);
    });
  }, [product.selectedType, product.selectedBrand]);

  useEffect(() => {
    ProductService.getAllBrands().then((data) => {
      product.setBrands(data);
    });

    ProductService.getAllTypes().then((data) => {
      product.setTypes(data);
    });

    product.setSelectedBrand({});
    product.setSelectedType({});
  }, []);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3} className="d-flex flex-column justify-content-between">
          <TypesBar />
          <Button
            className="mb-1"
            onClick={() => {
              product.setSelectedType({});
              product.setSelectedBrand({});
              product.setIsPagination(product.products.length > PAGE_LIMIT);
            }}
          >
            Reset filters
          </Button>
        </Col>
        <Col md={9} className="d-flex flex-column justify-content-between">
          <BrandBar />
          <ProductsList />
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Shop);
