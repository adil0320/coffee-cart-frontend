import React from "react";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>
        <span className={classes.marginRight}>
          ${props.price} x {props.quantity}
        </span>

        <button
          className={classes["btn-cart"]}
          onClick={props.onRemoveFromCart}
        >
          -
        </button>
        <button className={classes["btn-cart"]} onClick={props.onAddToCart}>
          +
        </button>
      </td>

      <td>
        <span className={classes.marginRight}>
          ${props.quantity * props.price}
        </span>
        <button
          className={`${classes["btn-cart"]} ${classes["btn-remove"]}`}
          onClick={props.onRemoveEntireFromCart}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
