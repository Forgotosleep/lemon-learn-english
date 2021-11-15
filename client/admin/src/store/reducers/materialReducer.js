import {
  SET_MATERIALS,
  SET_MATERIALSDETAILS,
  SET_MATERIALSLOADING,
  SET_MATERIALSERROR,
} from "../actions/type";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

function materialReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case SET_MATERIALS:
      newState.data = action.payload;
      break;

    case SET_MATERIALSLOADING:
      newState.loading = action.payload;
      break;

    case SET_MATERIALSERROR:
      newState.error = action.payload;
      break;
  }

  return newState;
}

export default materialReducer;
