import classes from "./Menu.module.css";

import CoffeeMenu from "../components/Menu/CoffeeMenu";

const MenuPage = () => {
  return (
    <>
      <div className={classes.title}>Menu</div>
      <CoffeeMenu />
    </>
  );
};

export default MenuPage;
