import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/const";
import { useContext, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

function NavbarComponent(props) {
  const { user, product } = useContext(Context);
  const [searchText, setSearchText] = useState("");
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to={SHOP_ROUTE}
        >
          Shopingfy
        </NavLink>
        <Form>
          <Form.Group className="d-flex justify-content-between">
            <Form.Control
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="I'm looking for..."
            />
            <Button onClick={() => product.setSearchProductName(searchText)}>
              <Icon.Search />
            </Button>
          </Form.Group>
        </Form>
        {user.isAuth ? (
          <Nav className="ml-auto">
            {user.user.roles.includes("user") && (
              <Button variant={"outline-light"}>
                <NavLink
                  style={{ color: "white", textDecoration: "none" }}
                  to={BASKET_ROUTE}
                >
                  <Icon.Cart2/>
                </NavLink>
              </Button>
            )}{" "}
            {user.user.roles.includes("admin") && (
              <Button variant={"outline-light"}>
                <NavLink
                  style={{ color: "white", textDecoration: "none" }}
                  to={ADMIN_ROUTE}
                >
                  Admin
                </NavLink>
              </Button>
            )}
            <Button
              variant={"outline-light"}
              className="ml-4"
              onClick={(e) => {
                user.logout();
              }}
            >
              Logout
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant={"outline-light"} className="mr-5">
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to={REGISTRATION_ROUTE}
              >
                Registration
              </NavLink>
            </Button>
            <Button variant={"outline-light"} className="ml-2">
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to={LOGIN_ROUTE}
              >
                Login
              </NavLink>
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default observer(NavbarComponent);
