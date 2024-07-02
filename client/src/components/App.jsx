import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import AppRouter from "./AppRouter";
import NavbarComponent from "./NavbarComponent";
import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";
import AuthService from "../services/AuthService";
import ProductService from "../services/ProductService";
import { PAGE_LIMIT } from "../utils/const";

function App() {
  const { user, product } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AuthService.checkAuth()
      .then((data) => {
        user.setIsAuth(true);
        user.setUser(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    ProductService.getProductsByName(product.searchProductName).then((data) => {
      if (Array.isArray(data)) {
        product.setProducts(data);
        product.setIsPagination(data.length > PAGE_LIMIT);
      }
    });
  }, [product.searchProductName]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <BrowserRouter>
        <NavbarComponent />
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default observer(App);
