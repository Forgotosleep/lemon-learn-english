import {
  SET_CATEGORY,
  SET_CATEGORYERROR,
  SET_CATEGORYLOADING,
} from "../actions/type";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

function categoryReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case SET_CATEGORY:
      newState.data = action.payload;
      break;

    case SET_CATEGORYLOADING:
      newState.loading = action.payload;
      break;

    case SET_CATEGORYERROR:
      newState.error = action.payload;
      break;
  }

  return newState;
}

export default categoryReducer;
