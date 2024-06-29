import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";

export const Context = createContext(null);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context.Provider
      value={{ user: new UserStore(), product: new ProductStore() }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
