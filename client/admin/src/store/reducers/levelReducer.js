import { SET_LEVEL, SET_LEVELERROR, SET_LEVELLOADING } from "../actions/type";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

function levelReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case SET_LEVEL:
      newState.data = action.payload;
      break;

    case SET_LEVELLOADING:
      newState.loading = action.payload;
      break;

    case SET_LEVELERROR:
      newState.error = action.payload;
      break;
  }

  return newState;
}

export default levelReducer;
