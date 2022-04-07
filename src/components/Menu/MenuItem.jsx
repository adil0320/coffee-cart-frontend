import React, { useContext } from "react";

import Card from "../UI/Card";
import MenuItemForm from "./MenuItemForm";

import classes from "./MenuItem.module.css";
import CartContext from "../../store/cart-context";

const MenuItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (quantity) => {
    cartCtx.addToCart({
      id: props.id,
      name: props.name,
      price: props.price,
      quantity,
    });
  };

  return (
    <Card>
      <li className={classes.item}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.ingredients}>
            Ingredients: {props.ingredients}
          </div>
          <div className={classes.price}>Price: ${props.price}</div>
        </div>
        <div>
          <MenuItemForm onAddToCart={addToCartHandler} />
        </div>
      </li>
    </Card>
  );
};

export default MenuItem;
