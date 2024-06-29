import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import ProductService from "../services/ProductService";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { observer } from "mobx-react-lite";

function TypesBar(props) {
  const { product } = useContext(Context);
  return (
    <ListGroup >
      {product.types.map((type) => (
        <ListGroupItem
          style={{ cursor: "pointer" }}
          key={type.name}
          active={type.id === product.selectedType.id}
          onClick={() => product.setSelectedType(type)}
        >
          {type.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default observer(TypesBar);
