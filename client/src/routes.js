// {path:"", element:""}

import AdminPage from "./pages/AdminPage";
import Auth from "./pages/Auth";
import BasketPage from "./pages/BasketPage";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import Registration from "./pages/Registration";
import Shop from "./pages/Shop";
import {
  ADMIN_ROUTE,
  AUTH_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_PAGE_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "./utils/const";

export const publicRoutes = [
  { path: REGISTRATION_ROUTE, element: Registration },
  { path: LOGIN_ROUTE, element: Login },
  { path: PRODUCT_PAGE_ROUTE + "/:id", element: ProductPage },
  { path: SHOP_ROUTE, element: Shop },
];

export const privateRoutes = [
  { path: BASKET_ROUTE, element: BasketPage },
  { path: AUTH_ROUTE, element: Auth },
  { path: ADMIN_ROUTE, element: AdminPage },
];

