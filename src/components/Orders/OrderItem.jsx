import React from "react";

import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  return (
    <div key={props.id} className={classes.name}>
      <span>
        Item Name: {props.name} ={">"}{" "}
      </span>
      <span>
        {props.quantity} x ${props.price} = ${props.quantity * props.price}
      </span>
    </div>
  );
};

export default OrderItem;
