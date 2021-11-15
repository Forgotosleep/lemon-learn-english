import { SET_CLASSES } from "../actionTypes";

const initialState = {
  classes: {},
};

function classesReducer(state = initialState, action) {
  if (action.type === SET_CLASSES) {
    return { ...state, classes: action.payload };
  }
  return state;
}

export default classesReducer;
