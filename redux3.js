import { createStore } from "redux";
// const
const ADD = "ADD";
// initial state
const iniNum = 0;
// action function
const addNumber = () => {
  return {
    type: ADD,
  };
};
// reducer function
const numReducer = (state = iniNum, action) => {
  switch (action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};
// create store
const store = createStore(numReducer);
// display result
store.subscribe(() => {
  //console.log(store.getState());
});

// add dispatch
store.dispatch(addNumber());
store.dispatch(addNumber());
store.dispatch(addNumber());

console.log(store.getState());
