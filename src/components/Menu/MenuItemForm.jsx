import React, { useRef } from "react";

import classes from "./MenuItemForm.module.css";

const MenuItemForm = (props) => {
  const quantityInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredQuantity = +quantityInputRef.current.value;
    props.onAddToCart(enteredQuantity);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.input}>
        <label htmlFor="quantity">Qty: </label>
        <input
          type="number"
          id="quantity"
          defaultValue={1}
          min={1}
          max={50}
          required
          ref={quantityInputRef}
        />
      </div>

      <button>Add</button>
    </form>
  );
};

export default MenuItemForm;
