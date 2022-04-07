import React, { useContext, useState } from "react";
import CartContext from "../store/cart-context";
import classes from "./Cart.module.css";
import CartTable from "../components/Cart/CartTable";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const hasCartItems = cartCtx.items.length > 0;

  console.log(cartCtx.items);
  console.log(new Date().toLocaleString());

  const orderSubmitHandler = async () => {
    setIsLoading(true);
    await fetch("https://adils-cafe-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        email: authCtx.email,
        items: cartCtx.items,
        totalAmount: cartCtx.totalAmount,
        orderDate: new Date().toLocaleString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    cartCtx.clearCart();
    history.push("/orders");
  };

  let content = (
    <center>
      <h2>No Coffee, go add some.</h2>
    </center>
  );

  if (hasCartItems) {
    content = (
      <>
        <div className={classes.title}>Cart</div>
        {isLoading && <LoadingSpinner />}
        <div className={classes.control}>
          <div className={classes.total}>
            <span>Total Amount:&nbsp;</span>
            <span>${cartCtx.totalAmount}</span>
          </div>
          <div
            className={`${classes.total} ${classes.order}`}
            onClick={orderSubmitHandler}
          >
            Place Order
          </div>
        </div>

        <CartTable />
      </>
    );
  }

  return content;
};

export default CartPage;
