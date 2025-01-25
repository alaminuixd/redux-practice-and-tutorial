import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Correctly using named import

// Initial state
const iniState = { todos: [], loading: false, error: null };

// Reducer
const todoReducer = (state = iniState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false, todos: action.payload };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Action creator
const fetchData = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
};

// Create store
const store = createStore(todoReducer, applyMiddleware(thunk));

// Subscribe to the store
store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch action function
store.dispatch(fetchData());
