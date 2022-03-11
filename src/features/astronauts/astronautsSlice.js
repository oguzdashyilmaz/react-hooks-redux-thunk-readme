export function fetchAstronauts() {
  return function (dispatch) {
    // dispatch an initial action to set up a "loading" state
    dispatch({ type: "astronauts/astronautsLoading" });

    // initiate a network request with fetch
    fetch("http://api.open-notify.org/astros.json")
      .then((response) => response.json())
      .then((astronauts) =>
        // when we have data from the response, dispatch another action to add the data to our Redux store
        dispatch({
          type: "astronauts/astronautsLoaded",
          payload: astronauts.people,
        })
      );
  };
}

// Reducers
// ./src/features/astronauts/astronautsSlice.js
const initialState = {
  entities: [], //array of astronauts
  status: "", //loading status for fetch
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "astronauts/astronautsLoaded":
      return {
        ...state,
        status: "idle",
        entities: action.payload,
      };
    case "astronauts/astronautsLoading":
      return {
        ...state,
        status: "loading",
      };
    default:
      return state;
  }
}