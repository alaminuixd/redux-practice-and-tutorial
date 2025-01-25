/* 
    using middleware in redux || we will use redux-logger middleware
 */
import { createStore, applyMiddleware } from "redux";
import pkg from "redux-logger";
const { logger } = pkg;

// initial state for "products"
const iniStateProducts = {
  products: ["Sugar", "Oil"],
  prodNum: 2,
};
// actions type "PRODUCTS"
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
// actions for "products"
const getProducts = () => {
  return {
    type: GET_PRODUCTS,
  };
};
const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

// product reducer
const productsReducer = (state = iniStateProducts, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        prodNum: state.prodNum + 1,
      };
    default:
      return state;
  }
};

// store
const store = createStore(productsReducer, applyMiddleware(logger));
//subscirbe
store.subscribe(() => {
  console.log(store.getState());
});
//dispatch products
store.dispatch(getProducts());
store.dispatch(addProduct("Rice"));
