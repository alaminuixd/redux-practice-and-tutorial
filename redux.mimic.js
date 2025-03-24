function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  // Get the current state
  const getState = () => state;

  // Dispatch an action to update state
  const dispatch = (action) => {
    // Update state by calling the reducer with current state and action
    state = reducer(state, action);

    // Notify all subscribed listeners that state has changed
    listeners.forEach((listener) => listener());

    // Return the action (standard Redux behavior)
    return action;
  };

  // Subscribe to state changes
  const subscribe = (listener) => {
    listeners.push(listener);

    // Return an unsubscribe function
    return () => {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  };

  // Initialize the store with a dummy action
  dispatch({ type: "@@INIT" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

// Reducer function (pure function that takes state and action, returns new state)
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Create the store
const store = createStore(counterReducer, { count: 0 });

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
  console.log("State changed:", store.getState());
});

// Dispatch some actions
store.dispatch({ type: "INCREMENT" }); // Logs: State changed: { count: 1 }
store.dispatch({ type: "INCREMENT" }); // Logs: State changed: { count: 2 }
store.dispatch({ type: "DECREMENT" }); // Logs: State changed: { count: 1 }

// Unsubscribe from further changes
unsubscribe();

// This won't trigger the listener (but state still updates)
store.dispatch({ type: "INCREMENT" });
