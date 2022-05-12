import CartContext from "./cart-context";
import { useReducer } from "react";

const retrievedCart = JSON.parse(localStorage.getItem("cart"));

let initialItems;
let initialToatalAmount = 0;

if (retrievedCart) {
  initialItems = retrievedCart;
  initialItems.forEach((item) => (initialToatalAmount += item.price));
} else {
  initialItems = [];
}
const defaultCartState = {
  items: initialItems,
  totalAmount: initialToatalAmount,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // const existinCartItemIndex = state.items.findIndex(
    //   (item) => item.id === action.item.id
    // );

    // const existinCartItem = state.items[existinCartItemIndex];

    // let updatedItems;

    // if (existinCartItem) {
    //   const updatedItem = {
    //     ...existinCartItem,
    //     amount: existinCartItem.amount + action.item.amount,
    //   };
    //   updatedItems = [...state.items];
    //   updatedItems[existinCartItemIndex] = updatedItem;
    // } else {
    //   updatedItems = state.items.concat(action.item);
    //   // console.log(updatedItems);
    // }
    let updatedItems = state.items.concat(action.item);

    if (action.item.loginStatus) {
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existinCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existinCartItem = state.items[existinCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existinCartItem.price;
    let updatedItems = state.items.filter((item) => item.id !== action.id);

    if (updatedItems.length === 0) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    }

    // if (existinCartItem.amount === 1) {
    //   updatedItems = state.items.filter((item) => item.id !== action.id);
    // } else {
    //   const updatedItem = {
    //     ...existinCartItem,
    //     amount: existinCartItem.amount - 1,
    //   };
    //   updatedItems = [...state.items];
    //   updatedItems[existinCartItemIndex] = updatedItem;
    // }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
