import React from "react";
import MenuItem from "./MenuItem";
import coffeeMenu from "../../coffeeMenu";
import classes from "./CoffeeMenu.module.css";

const CoffeeMenu = () => {
  return (
    <div className={classes.menu}>
      <ul>
        {coffeeMenu.map((coffee) => (
          <MenuItem
            key={coffee.id}
            id={coffee.id}
            name={coffee.name}
            ingredients={coffee.ingredients}
            price={coffee.price}
          />
        ))}
      </ul>
    </div>
  );
};

export default CoffeeMenu;
