import { Col, Container, Row, Button } from "react-bootstrap";
import TypesBar from "../components/TypesBar";
import BrandBar from "../components/BrandBar";
import ProductsList from "../components/ProductsList";
import { useContext, useEffect } from "react";
import { Context } from "../main";
import ProductService from "../services/ProductService";
import { observer } from "mobx-react-lite";

function Shop(props) {
  const { product } = useContext(Context);
  useEffect(() => {
    ProductService.getAllBrands().then((data) => {
      product.setBrands(data);
    });

    ProductService.getAllTypes().then((data) => {
      product.setTypes(data);
    });
  }, []);

  useEffect(() => {
    ProductService.getAllProductsWithFilters(
      product.selectedType.id,
      product.selectedBrand.id
    ).then((data) => {
      product.setProducts(data);
    });
  }, [product.selectedType, product.selectedBrand]);

  return (
    <Container>
      SHOP
      <Row>
        <Col md={3} className="d-flex flex-column justify-content-between">
          <TypesBar />
          <Button
            onClick={() => {
              product.setSelectedType({});
              product.setSelectedBrand({});
            }}
          >
            Reset filters
          </Button>
        </Col>
        <Col md={9}>
          <BrandBar />
          <ProductsList />
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Shop);
