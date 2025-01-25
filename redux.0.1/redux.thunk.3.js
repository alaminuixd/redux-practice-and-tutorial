import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

// initial state
const iniState = {
  todos: [],
  loading: false,
  error: null,
};

// reducer
const todoReducer = (state = iniState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  }
};

const fetchData = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SUCCESS", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "ERROR", payload: err });
      });
  };
};

// create store
const store = createStore(todoReducer, applyMiddleware(thunk));
// subscribe
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchData());
