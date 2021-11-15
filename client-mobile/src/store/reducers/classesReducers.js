import { SET_CLASSES, SET_ISLOADING, SET_ISERROR, SET_ERROR_CLASSES, SET_MESSAGE_CLASSES } from "../actionTypes";

const initialState = {
  classes: {},
  isLoading: false,
  isError: null,
  messageSuccess: "",
  messageError: "",
};

function classesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CLASSES:
      return { ...state, classes: action.payload };
    case SET_ISLOADING:
      return { ...state, isLoading: action.payload };
    case SET_ISERROR:
      return { ...state, isError: action.payload };
    case SET_MESSAGE_CLASSES:
      return { ...state, messageSuccess: action.payload };
    case SET_ERROR_CLASSES:
      return { ...state, messageError: action.payload };
    default:
      return state;
  }
}

export default classesReducer;
