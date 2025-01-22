// Step 1: Create a Redux store
import { createStore } from "redux";

// A simple reducer
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Step 2: Create a store with the reducer
const store = createStore(reducer);

// Step 3: Subscribe to the store (Task 1, Task 2, Task 3)
const unsubscribe = store.subscribe(() => {
  // Task 2: Callback triggered when state changes
  console.log("State changed:", store.getState()); // Task 3: Notify subscriber
});

// Dispatching actions (changes state)
store.dispatch({ type: "INCREMENT" }); // State changed: { count: 1 }
store.dispatch({ type: "INCREMENT" }); // State changed: { count: 2 }

// Step 4: Conditional unsubscribe based on a condition
if (store.getState().count > 1) {
  unsubscribe(); // Unsubscribe when count > 1
}

// After unsubscribing, no further state change will trigger the callback
store.dispatch({ type: "INCREMENT" }); // No output
store.dispatch({ type: "INCREMENT" }); // No output
store.dispatch({ type: "INCREMENT" }); // No output
store.dispatch({ type: "INCREMENT" }); // No output
