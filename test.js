import { createStore } from "redux";

// actions
const add = () => {
  return {
    type: "ADD",
    payload: item,
  };
};

const update = (item) => {
  return {
    type: "UPDATE",
    payload: { id: itemID, quantity },
  };
};

// reducer
const cartReducer = (state = iniState) => {};
