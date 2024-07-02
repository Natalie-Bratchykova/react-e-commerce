import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../main";
import ProductService from "../../services/ProductService";
function EditProductModal({ show, hide, currentProduct }) {
  console.log(currentProduct);
  const getProductData = () => {
    console.log(product.product.name);
    // setProductName(product.product.name);
    // setPrice(product.product.price);
    return product.product;
  };
  const { product } = useContext(Context);
  const [productName, setProductName] = useState(product.product.name || "");
  const [price, setPrice] = useState(currentProduct.price || 0);
  const [file, setFile] = useState();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    ProductService.getAllBrands().then((data) => {
      product.setBrands(data);
    });

    ProductService.getAllTypes().then((data) => {
      product.setTypes(data);
    });

    product.setProduct(currentProduct);
  }, []);

  const handleBrandChange = (val) => product.setSelectedBrand(val);
  const handleTypeChange = (val) => product.setSelectedType(val);
  const selectFile = (e) => setFile(e.target.files[0]);
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

  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title> {currentProduct.name}</Modal.Title>
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
          //   onClick={}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProductModal;
