import React, { useContext } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CartPage from "./pages/Cart";
import MenuPage from "./pages/Menu";
import AuthPage from "./pages/Auth";
import AuthContext from "./store/auth-context";
import OrdersPage from "./pages/Orders";

const App = () => {
  const authCtx = useContext(AuthContext);

  // authCtx.login(localStorage.getItem("token"), localStorage.getItem("email"));

  return (
    <Layout>
      <Switch>
        {!authCtx.isLoggedIn && (
          <Route path="*" exact>
            <AuthPage />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/" exact>
            <Redirect to="/menu" />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/menu">
            <MenuPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/cart">
            <CartPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/orders">
            <OrdersPage />
          </Route>
        )}
      </Switch>
    </Layout>
  );
};

export default App;
