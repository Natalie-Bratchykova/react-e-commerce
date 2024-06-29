import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/const";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
function AppRouter(props) {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth && (
        <>
          {privateRoutes.map(({ path, element }) => (
            <Route path={path} Component={element} key={path} />
          ))}
        </>
      )}
      {publicRoutes.map(({ path, element }) => (
        <Route path={path} Component={element} key={path} />
      ))}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
    </Routes>
  );
}

export default observer(AppRouter);
