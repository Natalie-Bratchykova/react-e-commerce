import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ROLES, SHOP_ROUTE } from "../utils/const";
import { InputGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
function FormComponent({
  buttonText,
  buttonFunction,
  formText,
  formLink,
  formTextAction,
  isRegistration,
}) {
  const navigateTo = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const btnFunction = async (email, password, roles) => {
    try {
      let data = await buttonFunction(email, password, roles);
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
  const [roles, setRoles] = useState([]);
  const addRole = (roles) => {
    setRoles(roles);
    console.log("role in click function");
    console.log(roles);
  };

  return (
    <Container
      className="mx-auto mt-5 flex justify-content-center align-items-center"
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
        {isRegistration && (
          <Form.Group>
            <ToggleButtonGroup type="checkbox" value={roles} onChange={addRole}>
              <ToggleButton id="check-btn1" value={ROLES.admin}>
                Seller
              </ToggleButton>
              <ToggleButton id="check-btn2" value={ROLES.user}>
                Customer
              </ToggleButton>
            </ToggleButtonGroup>
          </Form.Group>
        )}
        <Form.Group className="d-flex  justify-content-between">
          <span>
            {formText} <NavLink to={formLink}>{formTextAction}</NavLink>
          </span>
          {isRegistration ? <Button
            disabled={
              email.length === 0 || password.length === 0 || roles.length === 0
            }
            onClick={() => {
              console.log("role in click function");
              console.log(roles);
              btnFunction(email, password, roles);
            }}
          >
            {buttonText}
          </Button>: <Button
            disabled={
              email.length === 0 || password.length === 0
            }
            onClick={() => {
              console.log("role in click function");
              console.log(roles);
              btnFunction(email, password, roles);
            }}
          >
            {buttonText}
          </Button> }
          
        </Form.Group>
      </Form>
    </Container>
  );
}

export default observer(FormComponent);
