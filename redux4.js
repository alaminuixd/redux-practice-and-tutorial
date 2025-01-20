import { createStore } from "redux";

// consts
const ADD = "ADD";
// const num
const num = 0;
// action function
const incNum = () => {
  return {
    type: ADD,
  };
};
// reducer
const numReducer = (state = num, action) => {
  if (action.type === ADD) {
    return state + 1;
  }
  return state;
};
// create store
const store = createStore(numReducer);
// subscribe store
store.subscribe(() => {
  //console.log(store.getState());
});
for (let i = 0; i <= 10; i++) {
  store.dispatch(incNum());
}
console.log(store.getState());
// add function to be dispatched
/* for (let i = 0; i <= 10; i++) {
}
console.log(store.getState()); */
