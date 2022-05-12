import ExhibitionCartContext from "./ExhibitionCart-context";
import { useReducer } from "react";

const retrievedExhibitionCart = JSON.parse(localStorage.getItem("exhibition"));
let initialExhibitions;
let initialToatalAmount = 0;
if (retrievedExhibitionCart) {
  initialExhibitions = retrievedExhibitionCart;
  initialExhibitions.forEach(
    (exhibition) => (initialToatalAmount += exhibition.price * exhibition.qty)
  );
} else {
  initialExhibitions = [];
}
const defaultExhibitionCartState = {
  exhibitions: initialExhibitions,
  totalAmount: initialToatalAmount,
};

const exhibitionCartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.exhibition.price * action.exhibition.qty;

    const existingExhibitionCartIndex = state.exhibitions.findIndex(
      (exhibition) => exhibition.id === action.exhibition.id
    );

    const existingExhibitionCart =
      state.exhibitions[existingExhibitionCartIndex];
    let updatedExhibitions;
    if (existingExhibitionCart) {
      const updatedExhibition = {
        ...existingExhibitionCart,
        qty: existingExhibitionCart.qty + action.exhibition.qty,
      };
      updatedExhibitions = [...state.exhibitions];
      updatedExhibitions[existingExhibitionCartIndex] = updatedExhibition;
    } else {
      updatedExhibitions = state.exhibitions.concat(action.exhibition);
    }
    if (action.exhibition.loginStatus) {
      localStorage.setItem("exhibition", JSON.stringify(updatedExhibitions));
    }
    return {
      exhibitions: updatedExhibitions,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingExhibitionCartIndex = state.exhibitions.findIndex(
      (exhibition) => exhibition.id === action.id
    );
    const existingExhibitionCart =
      state.exhibitions[existingExhibitionCartIndex];
    const updatedTotalAmount = state.totalAmount - existingExhibitionCart.price;

    let updatedExhibitions;
    if (existingExhibitionCart.qty === 1) {
      updatedExhibitions = state.exhibitions.filter(
        (exhibition) => exhibition.id !== action.id
      );
    } else {
      const updatedItem = {
        ...existingExhibitionCart,
        qty: existingExhibitionCart.qty - 1,
      };
      updatedExhibitions = [...state.exhibitions];
      updatedExhibitions[existingExhibitionCartIndex] = updatedItem;
    }
    if (updatedExhibitions.length === 0) {
      localStorage.removeItem("exhibition");
    } else {
      localStorage.setItem("exhibition", JSON.stringify(updatedExhibitions));
    }
    return {
      exhibitions: updatedExhibitions,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultExhibitionCartState;
};

const ExhibitionCartProvider = (props) => {
  const [exhibitionCartState, dispatchExhibitionCartAction] = useReducer(
    exhibitionCartReducer,
    defaultExhibitionCartState
  );

  const addExhibitionToCartHandler = (exhibition) => {
    dispatchExhibitionCartAction({ type: "ADD", exhibition: exhibition });
  };

  const removeExhibitionFromCartHandler = (id) => {
    dispatchExhibitionCartAction({ type: "REMOVE", id: id });
  };

  const exhibitionCartContext = {
    exhibitions: exhibitionCartState.exhibitions,
    totalAmount: exhibitionCartState.totalAmount,
    addExhibition: addExhibitionToCartHandler,
    removeExhibition: removeExhibitionFromCartHandler,
  };

  return (
    <ExhibitionCartContext.Provider value={exhibitionCartContext}>
      {props.children}
    </ExhibitionCartContext.Provider>
  );
};

export default ExhibitionCartProvider;
