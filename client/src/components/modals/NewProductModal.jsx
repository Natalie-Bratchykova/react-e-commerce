import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import { Context } from "../../main";
import ProductService from "../../services/ProductService";
import { observer } from "mobx-react-lite";
import * as Icon from "react-bootstrap-icons";
function NewProductModal({ show, hide }) {
  const { product } = useContext(Context);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [typeId, setTypeId] = useState();
  const [brandId, setBranId] = useState();
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  const handleBrandChange = (brandId) => {
    setBranId(brandId);
  };

  const handleTypeChange = (typeId) => {
    setTypeId(typeId);
  };

  const selectFile = (e) => {
    let upload = e.currentTarget.files[0];
    setFile(upload);
  };

  useEffect(() => {
    ProductService.getAllTypes().then((data) => {
      product.setTypes(data);
    });

    ProductService.getAllBrands().then((data) => {
      product.setBrands(data);
    });
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const changeInfo = (key, targetValue, number) => {
    setInfo(
      info.map((el) =>
        el.number === number ? { ...el, [key]: targetValue } : el
      )
    );
  };

  const deleteInfo = (number) => {
    setInfo(info.filter((el) => el.number !== number));
  };

  const handleProductAdd = () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("image", file);
    formData.append("brandId", brandId);
    formData.append("typeId", typeId);
    formData.append("info", JSON.stringify(info));
    ProductService.createProduct(formData).then((data) => {
      hide();
    });
  };

  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Add new Product </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Product Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product name..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Price:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product price..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Brand:</Form.Label>
            <Form.Select
              onChange={(e) => handleBrandChange(e.currentTarget.value)}
            >
              <option>Select brand</option>
              {product.brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Type:</Form.Label>
            <Form.Select
              onChange={(e) => handleTypeChange(e.currentTarget.value)}
            >
              <option>Select type</option>
              {product.types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Attach file of product</Form.Label>
            <Form.Control type={"file"} onChange={selectFile} />
          </Form.Group>
          <Form.Group className="mt-2 ">
            <Row className="d-flex ">
              <Col>
                <Form.Label>Information</Form.Label>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button variant="outline-success" onClick={addInfo}>
                  Add information
                </Button>
              </Col>
            </Row>
            {info.map((el, i) => (
              <Form.Group
                key={i}
                className="d-flex justify-content-between align-items-center"
              >
                <Col md={5} className="px-2">
                  <Form.Label className="center">Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={el.title}
                    onChange={(e) =>
                      changeInfo("title", e.target.value, el.number)
                    }
                  />
                </Col>
                <Col md={5} className="px-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={el.description}
                    onChange={(e) =>
                      changeInfo("description", e.target.value, el.number)
                    }
                  />
                </Col>
                <Col
                  md={2}
                  className="d-flex flex-column justify-content-end px-2 mt-4 pt-1"
                >
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteInfo(el.number);
                    }}
                  >
                    <Icon.Trash />
                  </Button>
                </Col>
              </Form.Group>
            ))}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>
          Close
        </Button>
        <Button
          variant="success"
          disabled={
            productName.length === 0 ||
            price.length === 0 ||
            !Number(price) ||
            !brandId ||
            !typeId
          }
          onClick={handleProductAdd}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default observer(NewProductModal);
