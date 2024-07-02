import React, { useContext, useEffect } from "react";
import { Context } from "../main";

import { Card, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";

function BrandBar(props) {
  const { product } = useContext(Context);

  return (
    <Row className="d-flex">
      {product.brands.map((brand) => (
        <Card
          style={{ width: "fit-content", cursor: "pointer" }}
          className="p-2 mx-2"
          key={brand.id}
          border={brand.id === product.selectedBrand.id ? "danger" : ""}
          onClick={() => {
            product.setSelectedBrand(brand);
            console.log("brand is selected");
            console.log(brand.id);
            console.log(product.selectedBrand);
          }}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
}

export default observer(BrandBar);
