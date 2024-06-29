import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { SHOP_ROUTE } from "../utils/const";
function FormComponent({
  buttonText,
  buttonFunction,
  formText,
  formLink,
  formTextAction,
}) {
  const navigateTo = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const btnFunction = async (email, password) => {
    try {
      let data = await buttonFunction(email, password);
      if (data) {
        navigateTo(SHOP_ROUTE);
      }
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container
      className="mx-auto mt-5 flex justify-content-center align-items-center"
      // fluid
      style={{ width: window.innerWidth / 2 }}
    >
      <h2 className="text-center">{buttonText}</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span style={{ color: "red" }}>{errorMessage}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="d-flex  justify-content-between">
          <span>
            {formText} <NavLink to={formLink}>{formTextAction}</NavLink>
          </span>
          <Button
            onClick={() => {
              btnFunction(email, password);
            }}
          >
            {buttonText}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default observer(FormComponent);
