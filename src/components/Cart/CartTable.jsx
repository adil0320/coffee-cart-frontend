import React, { useContext } from "react";
import CartContext from "../../store/cart-context";

import CartItem from "./CartItem";

import classes from "./CartTable.module.css";

const CartTable = () => {
  const cartCtx = useContext(CartContext);
  const onAddToCartHandler = (item) => {
    cartCtx.addToCart({ ...item, quantity: 1 });
  };

  const onRemoveFromCartHandler = (id) => {
    cartCtx.removeFromCart(id);
  };

  const onRemoveEntireFromCartHandler = (id) => {
    cartCtx.removeEntireItemFromCart(id);
  };
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onAddToCart={onAddToCartHandler.bind(null, item)}
            onRemoveFromCart={onRemoveFromCartHandler.bind(null, item.id)}
            onRemoveEntireFromCart={onRemoveEntireFromCartHandler.bind(
              null,
              item.id
            )}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
