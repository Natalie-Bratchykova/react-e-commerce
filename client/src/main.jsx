import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import BasketStore from "./store/BasketStore";

export const Context = createContext(null);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        product: new ProductStore(),
        userBasket: new BasketStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
