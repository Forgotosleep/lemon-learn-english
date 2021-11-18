import {
  SET_MY_CLASSES,
  SET_LOADING_MYCLASSES,
  SET_ERROR_CLASSES
} from "../actionTypes";

const initialState = {
  myClasses: [],
  isLoading: false,
  isError: null
};

function myClassesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MY_CLASSES:
      return { ...state, myClasses: action.payload };
    case SET_LOADING_MYCLASSES:
      return { ...state, isLoading: action.payload };
    case SET_ERROR_CLASSES:
      return { ...state, isError: action.payload };
    default:
      return state;
  }
}

export default myClassesReducer;
