import { createStore } from "redux";
// const
const ADD = "ADD";
// ini state
const initState = {
  products: [],
  productsNum: 0,
};
// action function
const addProducts = (name) => {
  return {
    type: ADD,
    payload: { name },
  };
};
// reducer
const productReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD:
      const newProduct = [...state.products, action.payload.name];
      return {
        ...state,
        products: newProduct,
        productsNum: newProduct.length,
      };
    default:
      return state;
  }
};
// create store
const store = createStore(productReducer);
store.dispatch(addProducts("Pen"));
store.dispatch(addProducts("Book"));
store.dispatch(addProducts("Stapler"));
store.dispatch(addProducts("Paint"));

console.log(store.getState());
