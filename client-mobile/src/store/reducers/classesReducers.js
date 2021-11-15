import {
  SET_CLASSES,
  SET_ISLOADING,
  SET_ISERROR,
} from "../actionTypes";

const initialState = {
  classes: {},
  isLoading: false,
  isError: null
};

function classesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CLASSES:
      return { ...state, classes: action.payload }
    case SET_ISLOADING:
      return { ...state, isLoading: action.payload }
    case SET_ISERROR:
      return { ...state, isError: action.payload }
    default:
      return state
  }
}

export default classesReducer;
