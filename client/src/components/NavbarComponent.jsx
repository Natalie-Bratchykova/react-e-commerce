import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BasketService from "../services/BasketService";
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
import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

function NavbarComponent() {
  const { user, product, userBasket } = useContext(Context);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (user.user && user.user.id && user.user.roles.includes("user")) {
      BasketService.getUserBasket(user.user.id).then((data) => {
        userBasket.setBasketProductNum(data.length);
      });
    }
  }, [user.isAuth]);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to={SHOP_ROUTE}
        >
          Shopingfy
        </NavLink>
        <Form className="d-none d-md-block">
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
            {user.user && user.user.roles.includes("user") && (
              <Button
                style={{
                  background: "transparent",
                  color: "white",
                  borderColor: "transparent",
                }}
              >
                <NavLink
                  style={{ color: "white", textDecoration: "none" }}
                  className="d-flex align-items-center"
                  to={BASKET_ROUTE}
                >
                  <Icon.Cart2 className="mr-5" />

                  {userBasket.basketProductNum > 0 && (
                    <span
                      style={{
                        color: "red",
                        padding: ".3rem",
                      }}
                    >
                      {userBasket.basketProductNum}
                    </span>
                  )}
                </NavLink>
              </Button>
            )}{" "}
            {user.user && user.user.roles.includes("admin") && (
              <Button
                style={{
                  background: "transparent",
                  color: "white",
                  borderColor: "transparent",
                }}
              >
                <NavLink
                  style={{ color: "white", textDecoration: "none" }}
                  to={ADMIN_ROUTE}
                >
                  Admin
                </NavLink>
              </Button>
            )}
            <Button
              style={{
                background: "transparent",
                color: "white",
                borderColor: "transparent",
                marginLeft: "1rem",
              }}
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
