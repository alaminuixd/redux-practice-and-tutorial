import { createStore } from "redux";
// consts
const INCREMENT = "INCREMENT";
// initial state
const count = 0;
// actions
const incVal = () => {
  return { type: INCREMENT };
};
// reducers
const countReducer = (state = count, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
};

// create store
const store = createStore(countReducer);
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(incVal());
