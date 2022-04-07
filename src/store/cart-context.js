import React, { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const CartContext = React.createContext({
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  addToCart: (item) => {},
  removeFromCart: (id) => {},
  removeEntireItemFromCart: (id) => {},
  clearCart: () => {},
});

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedQuantity = state.totalQuantity + action.item.quantity;
    const updatedAmount =
      state.totalAmount + action.item.quantity * action.item.price;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalQuantity: updatedQuantity,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === "REMOVE") {
    const updatedQuantity = state.totalQuantity - 1;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
      totalQuantity: updatedQuantity,
    };
  }
  if (action.type === "REMOVE_ENTIRE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedQuantity = state.totalQuantity - existingItem.quantity;
    const updatedAmount =
      state.totalAmount - existingItem.quantity * existingItem.price;
    const updatedItems = state.items.filter((item) => item.id !== action.id);
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
      totalQuantity: updatedQuantity,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
};

export const CartContextProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

  const addToCartHandler = (item) => {
    dispatch({ type: "ADD", item });
  };

  const removeFromCartHandler = (id) => {
    dispatch({ type: "REMOVE", id });
  };

  const removeEntireItemFromCartHandler = (id) => {
    dispatch({ type: "REMOVE_ENTIRE", id });
  };

  const clearCartHandler = () => {
    dispatch({ type: "CLEAR" });
  };

  const context = {
    items: cartState.items,
    totalQuantity: cartState.totalQuantity,
    totalAmount: cartState.totalAmount,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    removeEntireItemFromCart: removeEntireItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
