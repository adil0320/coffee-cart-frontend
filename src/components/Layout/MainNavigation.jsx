import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Adil's Cafe</Link>
      </div>
      <nav>
        <ul>
          {authCtx.isLoggedIn && (
            <li>
              <NavLink to="/menu" activeClassName={classes.active}>
                Menu
              </NavLink>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <NavLink to="/cart" activeClassName={classes.active}>
                Cart
                <span className={classes.CartDisplay}>
                  {cartCtx.totalQuantity}
                </span>
              </NavLink>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <NavLink to="/orders" activeClassName={classes.active}>
                Orders
              </NavLink>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <NavLink to="/auth">
                <span onClick={authCtx.logout}>Logout</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
